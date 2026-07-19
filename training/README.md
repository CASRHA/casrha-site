# CASRHA Self-Paced Training Hub

**Live URL (after deployment):** https://wse.casrhafoundation.org/training/

## Overview

A complete self-paced learning platform for the Wholesome Sex Education training, allowing participants to:
- Watch all 6 training modules via embedded YouTube playlist
- Download 7 PDF manuals (6 modules + lesson plan)
- Complete their outreach at their own pace
- Submit reports and download certificates instantly
- Get live support via Tawk.to chat widget

## File Structure

```
training/
├── index.html              # Main training hub page
├── manuals/                # Training PDFs
│   ├── Lesson Plan Wholesome Sex Education for all ages (UPDATED FEB 2025).pdf
│   ├── Module 1 - Training Manual on Wholesome Sex Education for Children and Adolescents.pdf
│   ├── Module 2 - Training Manual on Wholesome Sex Education for Children and Adolescents.pdf
│   ├── Module 3 - Training Manual on Wholesome Sex Education for Children and Adolescents.pdf
│   ├── Module 4 - Training Manual on Wholesome Sex Education for Children and Adolescents.pdf
│   ├── Module 5 - Training Manual on Wholesome Sex Education for Children and Adolescents.pdf
│   └── Module 6 - Training Manual on Wholesome Sex Education for Children and Adolescents.pdf
└── README.md               # This file
```

## Features

### 1. **YouTube Playlist Embed**
- Full playlist embedded with responsive 16:9 player
- Playlist ID: `PL-9WZHzP6YXbezyO5iUyWc2Zzj9BSWrWa`
- All 6 modules accessible from the sidebar

### 2. **Downloadable Manuals**
- 7 PDF cards with file sizes displayed
- Direct download buttons for each manual
- Organized in chronological order (Lesson Plan first, then Modules 1-6)

### 3. **FAQ Accordion**
- 8 starter questions covering:
  - Eligibility and prerequisites
  - Training duration and pacing
  - Outreach requirements
  - Certificate process
  - Support channels
- Smooth expand/collapse with magenta accents

### 4. **Certificate Portal Integration**
- Preview of certificate design
- Direct link to `../certificate-portal/index.html`
- Clear instructions on submission process

### 5. **Live Support**
- **Tawk.to widget** embedded (bottom-right corner)
- Email contact: `info@casrhafoundation.org`
- Widget ID: `6a5d093a03ec7a1d4cd03b62/1jttmo36q`

### 6. **Full Site Integration**
- Shared CSS (`../css/styles.css`) with FAQ accordion styling (section 20)
- Shared JS (`../js/main.js`) for scroll animations, nav toggle, etc.
- Full chrome: announcement bar, sticky header/nav, footer
- Breadcrumb navigation: Home / Self-Paced Training

## Site-Wide Links Updated

The training hub is now linked from:
1. **Homepage (`index.html`)** — WSE program card has two buttons:
   - "Join WhatsApp training" (existing)
   - "Start self-paced training →" (new, links to `training/index.html`)
2. **All page footers** — "Free training" link now points to `training/index.html` instead of WhatsApp
   - `index.html` footer
   - `about.html` footer
   - `sac.html` footer

## Deployment Instructions

1. Upload the entire `training/` folder to your cPanel public_html directory
2. Ensure the `manuals/` subfolder and all 7 PDFs are uploaded
3. Verify the path matches: `public_html/training/index.html`
4. Test live URLs:
   - https://wse.casrhafoundation.org/training/
   - https://wse.casrhafoundation.org/training/manuals/Module%201%20-%20Training%20Manual%20on%20Wholesome%20Sex%20Education%20for%20Children%20and%20Adolescents.pdf

## Tawk.to Configuration

The Tawk.to widget is already embedded and will work immediately after deployment. To customize:

1. Log in to https://dashboard.tawk.to
2. Navigate to Property: **CASRHA Training**
3. Customize widget appearance, greeting message, and canned responses
4. View chat history and respond to participants in real-time

**Widget Embed Script Location:** `training/index.html` line ~167 (just before `</body>`)

## Testing Checklist

✅ YouTube playlist loads and plays  
✅ All 7 PDF download buttons work (no 404s)  
✅ FAQ accordion expands/collapses smoothly  
✅ Certificate CTA links to `../certificate-portal/index.html`  
✅ Tawk.to widget appears bottom-right  
✅ Email link opens mail client  
✅ Mobile nav toggle works  
✅ Scroll animations trigger on `.reveal` elements  
✅ Header becomes sticky with shadow on scroll  
✅ Footer year auto-populates with current year  
✅ Homepage links to training hub work  
✅ Footer "Free training" links work from all pages  

## Future Enhancements

- Add video thumbnails/descriptions for each module
- Add a progress tracker (localStorage-based)
- Add a testimonials section
- Add a "Download All Manuals" zip file option
- Integrate Google Analytics to track completion rates
- Add social sharing buttons for certificates

## Support

For questions or issues:
- **Email:** info@casrhafoundation.org
- **WhatsApp:** +234 815 098 9646
- **Tawk.to chat:** Available on the training page

---

**Built:** July 2026  
**CASRHA Foundation** — Wholesome Sex Education
