import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {
  Form,
  Item,
  Label,
  Input,
  Icon,
  Button,
  Container,
  Content,
} from 'native-base';

import styles from './styles';

export default class createSquadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      github: 0,
      size: 0,
      maxSize: 10,
      billed: 'Monthly',
      price: 3.5,
      status: 'Subscribed',
    };
  }

  get_size_ratio() {
    return this.state.size + ' / ' + this.state.maxSize;
  }

  get_invite_button() {
    if (this.props.subscriptionData.status === 0) {
      return (
        <Button
          block
          disabled={false}
          style={{ margin: 15, marginTop: 50 }}
          onPress={() => alert('Update pressed')}
        >
          {/** SIGN UP **/}
          <Text>Update</Text>
        </Button>
      );
    }
  }

  get_billing_label() {
    var label = 'Billing';
    if (this.props.subscriptionData.status === 0) {
      label += ' - (Owners are not billed)';
    }
    return label;
  }

  get_billing_date() {
    const status = this.props.subscriptionData.status;
    var label = 'November 11, 2018';
    if (status === 0) {
      return (
        <Form
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Item floatingLabel last style={{ width: 50 + '%' }}>
            <Label>Your Payment Date</Label>
            <Input value={'Nov. 30th, 2018'} disabled={true} />
          </Item>

          <Item floatingLabel last style={{ width: 50 + '%' }}>
            <Label>Expected Amount</Label>
            <Input value={'$ 27.87'} disabled={true} />
          </Item>
        </Form>
      );
    } else {
      return (
        <Form
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Item floatingLabel last style={{ width: 100 + '%' }}>
            <Label>Next Billing Date</Label>
            <Input value={label} disabled={true} />
          </Item>
        </Form>
      );
    }
  }

  render() {
    const data = this.props.subscriptionData;
    if (data.status === 0) {
      var statusColor = 'purple';
      var status = 'Owner';
    } else if (data.status === 1) {
      statusColor = 'grey';
      status = 'Pending';
    } else {
      statusColor = 'green';
      status = 'Active';
    }

    const price = parseFloat(data.price).toFixed(2);

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <ScrollView>
          {/** HEADER **/}
          <View style={{ flex: 1, marginTop: 22 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              {/** BACK ARROW **/}
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.toggleModal();
                  }}
                >
                  <Icon name="md-arrow-back" style={{ color: 'black' }} />
                </TouchableOpacity>
              </View>
            </View>

            {/** SUBSCRIPTION TITLE **/}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 15,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                }}
              >
                <Text style={styles.title}>
                  {data.service}
                </Text>
              </View>

              <View style={{ flex: 1 }} />
            </View>

            {/** HORIZONTAL LINE 1 **/}
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 2,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 0.5,
                      width: 80 + '%',
                    }}
                  />

                  <View style={{ flex: 1 }} />
                </View>
                {/** HORIZONTAL LINE 2 **/}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingHorizontal: 15,
                    paddingTop: 10,
                  }}
                >
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 0.5,
                      width: 40 + '%',
                    }}
                  />

                  <View style={{ flex: 1 }} />
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingHorizontal: 15,
                }}
              >
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <Text style={{ color: 'grey' }}>ID: </Text>
                  <Text>
                    {data.plan_name}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: statusColor }}>
                    {status}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/** BODY CONTENT **/}
          <View style={{ marginTop: 20 }}>
            <Container style={styles.container}>
              <Content>
                {/** FORM BEGIN **/}
                <Form>
                  <Item floatingLabel>
                    <Label>
                      {this.get_billing_label()}
                    </Label>
                    <Input
                      value={'$ ' + price + ' / Monthly'}
                      disabled={true}
                    />
                  </Item>
                </Form>

                {this.get_billing_date()}

                <Form>
                  <Item floatingLabel>
                    <Label>Squad Members (Excluding Owner)</Label>
                    <Input
                      value={data.current_size + ' / ' + data.maximum_size}
                      disabled={true}
                    />
                  </Item>
                </Form>
                {/** FORM END **/}
                {this.get_invite_button()}
              </Content>
            </Container>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}
