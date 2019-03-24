"""
Custom invoice manager to for stripe invoices
"""

##########################################################################
## Imports
##########################################################################

import sys
from backend.utility import *
from backend.email import EmailManager
from subscription.models import SubscriptionMember

##########################################################################
## Invoice Manager
##########################################################################

class InvoiceManager(object):
    
    def _get_invoice_items(self, invoice):
        return invoice.lines.data
    
    def _get_plan_id_from_member(self, member):
        return self._get_invoice_item_from_member(member).stripe_plan_id
    
    def _datetime_to_epoch(self, dateTime):
        return int(dateTime.timestamp())
    
    def _time_difference(self, epoch1, epoch2):
        return abs(epoch2 - epoch1)
    
    def _get_invoice_item_from_member(self, member):
        return member.subscription_account.subscription_plan
    
    def _item_plan_matches(self, item, memberPlan):
        if item.plan and item.plan.id == memberPlan:
            return True
        return False
    
    def get_closest_item(self, member, invoice=None):
        if invoice == None:
            invoice = member.user.upcoming_invoice()
        memberPlan = self._get_plan_id_from_member(member)
        return self._get_closest_item(member, invoice, memberPlan)
        
    def _get_closest_item(self, member, invoice, memberPlan):
        items = self._get_invoice_items(invoice)
        leastDifference = self._initial_difference(items, member)
        closestItem = items[0]
        for item in items:
            difference = self._check_item_distance(item, member, memberPlan)
            if difference < leastDifference:
                leastDifference = difference
                closestItem = item
        return closestItem
    
    def _check_item_distance(self, item, member, memberPlan):
        if self._item_plan_matches(item, memberPlan):
            return self._get_item_difference(item, member)
        return sys.maxsize
            
    def _get_member_create_epoch(self, member):
        createdDateTime = member.date_created
        createdEpoch = self._datetime_to_epoch(createdDateTime)
        return createdEpoch
            
    def _get_item_difference(self, item, member):
        memberCreated = self._get_member_create_epoch(member)
        itemCreated = item.period.start
        return self._time_difference(itemCreated, memberCreated)
    
    def _initial_difference(self, items, member):
        initialItem = items[0]
        return self._get_item_difference(initialItem, member)