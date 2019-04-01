{% extends "admin/change_form.html" %}
{% load i18n admin_static admin_modify %}


{% load i18n static jet_tags %}
{% block extrahead %}
    {{ block.super }}

{% endblock %}
{% block blockbots %}
    {{ block.super }}
    <!-- FIXING SELECT 2 JQUERY ISSUE-->
    <script src="{% static 'admin/js/vendor/jquery/jquery.js' as url %}{{ url|jet_append_version }}"
            type="text/javascript"></script>
    <script src="{% static 'admin/js/jquery.init.js' as url %}{{ url|jet_append_version }}"></script>
{% endblock %}

{% block content %}
  <div id="content-main">
    <form action="" method="POST">
      {% csrf_token %}
      {% if form.non_field_errors|length > 0 %}
        <p class="errornote">
            "Please correct the errors below."
        </p>
        {{ form.non_field_errors }}
      {% endif %}

      <fieldset class="module aligned">
        <div class="form-row">
          Username: {{subscriptionAccount.username}}
        </div>
        <div class="form-row">
          Password: {{subscriptionAccount.password}}
        </div>
      </fieldset>
      <br />

      <fieldset class="module aligned">
        {% for field in form %}
          <div class="form-row">
            {{ field.errors }}
            {{ field.label_tag }}
            {{ field }}
            {% if field.field.help_text %}
            <p class="help">
              {{ field.field.help_text|safe }}
            </p>
            {% endif %}
          </div>
        {% endfor %}
      </fieldset>

      <div class="submit-row">
        <input type="submit" class="default" value="Activate">
      </div>

    </form>
  </div>

{% endblock %}
