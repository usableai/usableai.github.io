---
layout: page
title: Projects
subtitle: Research projects at AIXLab
---

<div data-aix-filters="projects">

<div class="aix-filters">
  <div class="aix-filter-row">
    <span class="aix-filter-row__label">Status</span>
    <button class="aix-chip is-active" data-filter="status" data-value="">All</button>
    <button class="aix-chip" data-filter="status" data-value="active">Active</button>
    <button class="aix-chip" data-filter="status" data-value="completed">Completed</button>
  </div>
  <div class="aix-filter-row">
    <span class="aix-filter-row__label">Role</span>
    <button class="aix-chip is-active" data-filter="role" data-value="">All</button>
    <button class="aix-chip" data-filter="role" data-value="host">Host</button>
    <button class="aix-chip" data-filter="role" data-value="technical-host">Technical Host</button>
    <button class="aix-chip" data-filter="role" data-value="participant">Participant</button>
  </div>
</div>

{% assign domain_order = "Situation Awareness,Healthcare & Medicine,Automotive,Transport & Infrastructure,Building,Sustainability" | split: "," %}

{% for domain in domain_order %}
  {% assign domain_projects = site.data.projects | where: "domain", domain %}
  {% if domain_projects.size > 0 %}
    <section class="aix-filter-section" id="{{ domain | slugify }}">
      <h2 class="aix-section-title" style="margin-top:2.5rem">{{ domain }}</h2>
      <div class="aix-grid">
        {% for project in domain_projects %}
          <div class="aix-card aix-project-card aix-filterable"
               data-status="{{ project.status }}"
               data-role="{{ project.role }}"
               data-domain="{{ project.domain | downcase }}"
               data-search="{{ project.title | downcase | strip }} {{ project.description | downcase | strip }} {{ project.funder | downcase }}">
            <h3 class="aix-project-card__title">{{ project.title }}</h3>
            <p class="aix-project-card__meta">
              <strong>{{ project.years }}</strong>
              {% if project.funder and project.funder != "" %} · {{ project.funder }}{% endif %}
            </p>
            <p class="aix-project-card__desc">{{ project.description }}</p>
            {% if project.url %}<p class="aix-project-card__link"><a href="{{ project.url }}">Project page →</a></p>{% endif %}
            <div class="aix-project-card__tags">
              {% if project.status == "active" %}
                <span class="aix-pill aix-pill--brand">Active</span>
              {% else %}
                <span class="aix-pill aix-pill--muted">Completed</span>
              {% endif %}
              {% case project.role %}
                {% when "host" %}<span class="aix-pill">Host</span>
                {% when "technical-host" %}<span class="aix-pill">Technical Host</span>
                {% when "participant" %}<span class="aix-pill aix-pill--muted">Participant</span>
              {% endcase %}
              {% if project.hiring %}{% if project.hiring_url %}<a class="aix-pill aix-pill--warn" href="{{ project.hiring_url }}">Hiring →</a>{% else %}<span class="aix-pill aix-pill--warn">Hiring</span>{% endif %}{% endif %}
            </div>
          </div>
        {% endfor %}
      </div>
    </section>
  {% endif %}
{% endfor %}

<div class="aix-empty" style="display:none">No projects match the current filters.</div>

</div>
