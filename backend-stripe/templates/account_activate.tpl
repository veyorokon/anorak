{% extends "admin/change_form.html" %}
{% load i18n admin_static admin_modify %}
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