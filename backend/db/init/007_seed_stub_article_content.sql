-- ==========================================
-- Populate the three content_db rows seeded in supabase_migration.sql
-- (Welcome, Immigration Guide, Housing Tips) with real body text.
--
-- Data-only — no schema change, safe to run any time. These were seeded
-- with a single placeholder sentence each, which is why the Articles page
-- showed them with no summary and a flat "1 min read". Matched by title +
-- page_name so this only ever touches those three original rows.
-- ==========================================

UPDATE content_db
SET body_content = 'Welcome to SettleCAN — a settlement companion built for newcomers to Canada, whether you''re arriving as an international student, a work permit holder, a permanent resident, a protected person, or a visitor.

Moving to a new country means juggling a long list of one-time and recurring tasks: applying for a Social Insurance Number, registering for provincial health coverage, opening a bank account, finding housing, and staying on top of permit conditions and renewal deadlines. SettleCAN brings all of that into one place.

Start with My Tasks. As soon as your immigration status is set on your profile, SettleCAN generates a personalized checklist of the settlement tasks that apply to you, broken into subtasks with optional due dates. Set a date on anything and you will be reminded automatically as it approaches — no separate step required.

Check Compliance for the permit conditions and legal obligations tied to your specific status, generated the same way as your tasks so they stay in sync with what you have already reviewed.

Use the Calendar to see every upcoming task deadline and document expiry date in one view, and Document Alerts to track the expiry dates of your passport, permit, and other key documents.

Browse Guides & Articles for step-by-step instructions on common processes (SIN, health card, bank account, permit renewal, tax filing), and Community to ask questions and swap advice with other newcomers who have gone through the same steps.

However far along you are in your journey, take a few minutes to fill out your profile accurately — your immigration status and arrival date are what drive the personalized checklist and reminders throughout the app.',
    last_updated = now()
WHERE title = 'Welcome' AND page_name = 'Landing Page';

UPDATE content_db
SET body_content = 'Canada''s immigration system covers several distinct pathways, and the right one for you depends on why you are coming to Canada and what status you already hold.

Temporary residence covers study permits, work permits, and visitor status. A study permit lets you study at a Designated Learning Institution (DLI) and, in most cases, work off-campus part-time. A work permit is either employer-specific (tied to one employer, occupation, and sometimes location) or open (allows you to work for almost any employer). Visitors do not have automatic work or study authorization.

Permanent residence is most commonly reached through Express Entry — a points-based system (the Comprehensive Ranking System, or CRS) covering the Federal Skilled Worker, Canadian Experience Class, and Federal Skilled Trades programs — or through a Provincial Nominee Program (PNP), where a province nominates candidates for PR based on its own labour-market needs. Family sponsorship (spouses, partners, dependent children, and parents/grandparents) and the refugee and protected persons stream are separate pathways with their own eligibility rules.

A few principles apply across almost every pathway:
- Apply for renewals or extensions well before your current document expires — IRCC recommends starting at least 30–90 days ahead depending on the permit type.
- If you apply to extend a work or study permit before it expires, you generally continue under "implied status" while the application is processed — but you cannot travel outside Canada and re-enter under implied status.
- Processing times vary by application type and change frequently. Always check IRCC''s official processing time tool for a current estimate rather than relying on a fixed number.
- Keep copies of every document you submit, and keep your contact information (especially your address) up to date in your IRCC account — you are required to report an address change within 180 days.

For the specific steps involved in a particular process (a SIN application, a permit renewal, a study permit extension), see the dedicated guides on the Guides & Articles page — this overview is meant as a starting map, not a replacement for your own application''s instructions.',
    last_updated = now()
WHERE title = 'Immigration Guide' AND page_name = 'Guide';

UPDATE content_db
SET body_content = 'Finding your first home in Canada is usually the most time-pressured task on a newcomer''s list — start looking as early as you can, ideally before you arrive if your timeline allows it.

Where to look: Provincial and city-specific rental listing sites and classifieds (such as Kijiji and Craigslist), your institution''s off-campus housing office if you are a student, and local newcomer/settlement agencies, which often maintain housing resources and can help you avoid common rental scams targeting new arrivals.

Budget for more than rent: Most landlords ask for first and last month''s rent up front. Depending on the province, you may also need renter''s insurance, and utilities (electricity, heat, internet) are often separate from rent unless the listing says "utilities included." As a rule of thumb, aim to keep rent at or under 30% of your gross income.

Documents landlords commonly ask for: government-issued photo ID, proof of income or an employment/offer letter, a Canadian credit history or credit check (newcomers without one can often provide a larger deposit, a guarantor, or proof of savings instead), and references from a previous landlord if you have Canadian rental history.

Know your rights: Residential tenancies are regulated provincially — Ontario, British Columbia, Alberta, and Quebec each have their own Residential Tenancies Act (or equivalent) and a tribunal that handles disputes. Read your lease carefully before signing, understand the notice period required to end a tenancy, and be wary of any landlord who asks for payment (deposit or otherwise) before you have seen the unit in person or on a verified video call.

Watch for scams: Never wire money for a unit you have not viewed, be suspicious of rents significantly below market rate, and verify that the person you are dealing with actually owns or manages the property before sending any funds.

Bridge housing: If you need a short-term place while you search for something permanent, consider short-term furnished rentals, extended-stay hotels, or your institution''s temporary housing options if you are a student — this gives you room to view units in person rather than committing sight-unseen from abroad.',
    last_updated = now()
WHERE title = 'Housing Tips' AND page_name = 'Housing Tips';
