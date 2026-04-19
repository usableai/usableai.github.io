---
layout: page
title: Team
subtitle: "The people behind AIXLab ♥"
---

<div class="aix-section-label">How we work</div>
<h2 class="aix-section-title">Collaboration</h2>

<p>
  We work closely with industry and clinical partners to ground our research in real
  data and real problems. We are always looking for industrial collaborators, and for
  master's students to join us as interns or to write their master's thesis with us.
</p>

<p>
  We care about open communication. Our students work directly with industry partners,
  testing their ideas against industrial problems and in real testbeds and environments.
  This keeps the research grounded and gives students firsthand exposure to how AI
  systems actually get used.
</p>

<p>
  Inside the lab, we support each other and invest in strong personal connections.
  Every PhD student owns their research product that they can be proud of. We give each other room to think, and help
  each other grow as researchers and as people. Independent and critical thinking is
  essential: we expect everyone to form their own views, question assumptions
  (including ours), and revise those views when the evidence calls for it.
</p>

<p>
  Interested in joining or collaborating?
  <a href="/opportunities">See open positions</a>
  or email <a href="mailto:yinan@chalmers.se">yinan@chalmers.se</a>.
</p>

<h2 class="aix-section-title" style="margin-top:3rem">Members <em style="font-weight:400; font-size:.55em; color:var(--text-muted); margin-left:.6rem; letter-spacing:.02em; vertical-align:middle">— alphabetic order</em></h2>

{% assign order = "organizer,phd,postdoc,collaborator,alumni" | split: "," %}
{% assign titles = "Organizers,PhD Students,Postdocs,Collaborators,Alumni" | split: "," %}

{% for group in order %}
{% assign group_members = site.data.members | where: "group", group %}
{% if group_members and group_members.size > 0 %}
{% assign idx = forloop.index0 %}
<section class="aix-team-group{% if group == 'alumni' %} aix-team-group--alumni{% endif %}">
<h2 class="aix-team-group__heading">{{ titles[idx] }}</h2>
<div class="aix-team-grid">
{% for member in group_members %}
<div class="aix-member-card">
<img src="{{ member.image }}" alt="Photo of {{ member.name }}">
<div class="aix-member-card__name">
{% if member.bio_link %}<a href="{{ member.bio_link }}">{{ member.name }}</a>
{% elsif member.external_link %}<a href="{{ member.external_link }}">{{ member.name }}</a>
{% else %}{{ member.name }}{% endif %}
</div>
<div class="aix-member-card__role">{{ member.role }}</div>
{% if member.affiliation %}
<div class="aix-member-card__role" style="font-size:.85rem">
{% if member.affiliation_link %}<a href="{{ member.affiliation_link }}">{{ member.affiliation }}</a>
{% else %}{{ member.affiliation }}{% endif %}
</div>
{% endif %}
{% if member.tags %}{% for tag in member.tags %}<span class="aix-member-card__tag">{{ tag }}</span>{% endfor %}{% endif %}
</div>
{% endfor %}
</div>
</section>
{% endif %}
{% endfor %}
