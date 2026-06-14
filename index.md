---
layout: page
title: AIXLab@Chalmers
subtitle: Co-creating <em>usable</em> AI
---

<section class="aix-hero">
  <span class="aix-hero__eyebrow">Research lab · Chalmers University of Technology · Since 2023</span>
  <h1 class="aix-hero__title">We build AI systems that are <em>usable</em> in the real world.</h1>
  <p class="aix-hero__lede">
    AIXLab is a research lab at the Department of Computer Science and Engineering,
    Chalmers University of Technology. We develop and validate machine learning and
    multimodal AI systems that integrate domain knowledge and are deployed in practice
    across healthcare, automotive, transport, and sustainable construction.
  </p>
</section>

<div class="aix-section-label">What we work on</div>
<h2 class="aix-section-title">Research domains</h2>

<div class="aix-grid">
  {% assign domains = site.data.projects | map: "domain" | uniq %}
  {% for domain in domains %}
    {% assign domain_projects = site.data.projects | where: "domain", domain %}
    {% assign active_count = domain_projects | where: "status", "active" | size %}
    <div class="aix-card">
      <h3 style="margin-top:0">{{ domain }}</h3>
      <p class="aix-project-card__meta">
        <strong>{{ active_count }}</strong> active project{% if active_count != 1 %}s{% endif %}
        · {{ domain_projects | size }} total
      </p>
      <p class="aix-project-card__desc" style="font-size:.95rem">
        {% case domain %}
          {% when "Situation Awareness" %}Digital twins, vision-language models, and decision support for safety-critical operations.
          {% when "Healthcare & Medicine" %}LLM-based clinical decision support and AI-driven telemonitoring for heart failure care.
          {% when "Automotive" %}Foundation models for vehicle behavior, LLMs for automotive software engineering.
          {% when "Transport & Infrastructure" %}Inclusive mobility, digital twins of transport systems, pavement maintenance.
          {% when "Building" %}AI for circular construction, sustainable renovation, and urban planning.
          {% when "Sustainability" %}Data-driven methods for climate and sustainability analysis.
        {% endcase %}
      </p>
      <p style="margin-bottom:0"><a href="/projects#{{ domain | slugify }}">See projects →</a></p>
    </div>
  {% endfor %}
</div>

<div class="aix-section-label">Selected research</div>

<section class="aix-figure">
  <h2 class="aix-section-title">Agentic AI across the automotive software lifecycle</h2>
  <p class="aix-figure__sub">LLM agents mapped to the phases they target, from code generation to Go/No-Go release decisions, closed by a re-engineering and optimization loop. Developed and evaluated with Volvo.</p>
  {% include fig-automotive-lifecycle.svg %}
</section>

<section class="aix-figure">
  <h2 class="aix-section-title">Multimodal knowledge-intensive systems</h2>
  <p class="aix-figure__sub">Vision, language, sensor, and geospatial inputs flow through perception and knowledge-grounded reasoning to safety-critical decisions.</p>
  {% include fig-knowledge-system.svg %}
</section>
