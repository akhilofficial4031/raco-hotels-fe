# Developer Guide: SEO & Accessibility Best Practices

Quick reference guide for maintaining and improving SEO and accessibility in the Raco Hotels codebase.

## Quick Checklist for New Components

### ✅ Semantic HTML
```tsx
// ❌ Bad
<div className="header">
  <div className="nav">...</div>
</div>

// ✅ Good
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">...</nav>
</header>
```

### ✅ ARIA Labels
```tsx
// ❌ Bad
<button onClick={handleClick}>
  <IconComponent />
</button>

// ✅ Good
<button 
  onClick={handleClick}
  aria-label="Open menu"
>
  <IconComponent aria-hidden="true" />
</button>
```

### ✅ Heading Hierarchy
```tsx
// ❌ Bad - Skipping levels
<h1>Page Title</h1>
<h3>Section Title</h3>

// ✅ Good - Proper hierarchy
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
```

### ✅ Form Accessibility
```tsx
// ❌ Bad
<input placeholder="Name" />
<span className="error">Required</span>

// ✅ Good
<label htmlFor="name-input">
  Full Name <span aria-label="required">*</span>
</label>
<input 
  id="name-input"
  type="text"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? "name-error" : undefined}
/>
{hasError && (
  <span id="name-error" role="alert">
    Full name is required
  </span>
)}
```

### ✅ Images
```tsx
// ❌ Bad
<img src="/hotel.jpg" />

// ✅ Good - Content image
<Image 
  src="/hotel.jpg" 
  alt="Grand Palace Hotel exterior with fountain"
  width={800}
  height={600}
  priority={isAboveFold}
  loading={isAboveFold ? undefined : "lazy"}
/>

// ✅ Good - Decorative image
<Image 
  src="/decoration.svg" 
  alt=""
  aria-hidden="true"
  width={100}
  height={100}
/>
```

### ✅ Buttons and Links
```tsx
// ❌ Bad
<div onClick={handleClick}>Click me</div>
<a href="#">Learn more</a>

// ✅ Good
<button 
  onClick={handleClick}
  aria-label="Book hotel room"
  className="focus:outline-none focus:ring-2 focus:ring-primary"
>
  Book Now
</button>

<Link 
  href="/about"
  className="focus:outline-none focus:ring-2 focus:ring-primary"
>
  Learn more about our hotels
</Link>
```

### ✅ Focus States
```tsx
// All interactive elements should have visible focus
<button className="... focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Click me
</button>
```

---

## SEO Best Practices

### 1. Page Metadata
Every page should have proper metadata:

```tsx
// app/your-page/page.tsx
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Your Page Title",
  description: "Clear, concise description under 160 characters",
  keywords: "relevant, keywords, for, this, page",
  path: "/your-page",
});
```

### 2. Structured Data
Add JSON-LD structured data to pages:

```tsx
import Script from "next/script";
import { generateOrganizationSchema } from "@/lib/seo";

export default function Page() {
  const schema = generateOrganizationSchema();
  
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      {/* Your page content */}
    </>
  );
}
```

### 3. Canonical URLs
Always set canonical URLs:

```tsx
export const metadata: Metadata = {
  // ... other metadata
  alternates: {
    canonical: 'https://raco-hotels.com/your-page',
  },
};
```

### 4. Open Graph Images
Ensure all pages have OG images:

```tsx
export const metadata: Metadata = {
  // ... other metadata
  openGraph: {
    images: [
      {
        url: 'https://raco-hotels.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Descriptive alt text',
      },
    ],
  },
};
```

---

## Accessibility Pattern Library

### Modal/Dialog Pattern
```tsx
"use client";
import { useEffect, useRef } from "react";

export function AccessibleModal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      // Focus trap
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      firstElement?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="relative bg-white rounded-lg p-6">
          <h2 id="modal-title" className="text-2xl font-bold mb-4">
            Modal Title
          </h2>
          {children}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Dropdown Menu Pattern
```tsx
"use client";
import { useState, useRef, useEffect } from "react";

export function AccessibleDropdown({ label, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };
  
  return (
    <div ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${label} menu`}
      >
        {label}
        <span aria-hidden="true">▼</span>
      </button>
      
      {isOpen && (
        <ul role="menu" aria-label={`${label} submenu`}>
          {items.map((item, index) => (
            <li key={index} role="none">
              <a href={item.href} role="menuitem">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Loading State Pattern
```tsx
export function LoadingContent() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <div className="animate-spin" aria-hidden="true">⟳</div>
      <span className="sr-only">Loading, please wait...</span>
    </div>
  );
}
```

### Alert/Notification Pattern
```tsx
export function Alert({ type, message }: { type: 'success' | 'error' | 'info'; message: string }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`p-4 rounded ${
        type === 'error' ? 'bg-red-100 text-red-900' :
        type === 'success' ? 'bg-green-100 text-green-900' :
        'bg-blue-100 text-blue-900'
      }`}
    >
      <span className="sr-only">{type}: </span>
      {message}
    </div>
  );
}
```

---

## Testing Commands

### Accessibility Testing
```bash
# Run automated accessibility tests
npm run test:a11y

# Run Lighthouse CI
npm run lighthouse

# Check ARIA validity (if configured)
npm run test:aria
```

### SEO Testing
```bash
# Generate sitemap
npm run build

# Test sitemap generation
curl http://localhost:3000/sitemap.xml
curl http://localhost:3000/server-sitemap.xml

# Validate robots.txt
curl http://localhost:3000/robots.txt
```

---

## Common Patterns to Avoid

### ❌ Don't Use Click Handlers on Non-Interactive Elements
```tsx
// Bad
<div onClick={handleClick}>Click me</div>
<span onClick={handleSubmit}>Submit</span>

// Good
<button onClick={handleClick}>Click me</button>
<button type="submit" onClick={handleSubmit}>Submit</button>
```

### ❌ Don't Hide Important Content from Screen Readers
```tsx
// Bad
<div className="hidden">Important information</div>

// Good - if you want to hide visually but keep for screen readers
<div className="sr-only">Important information for screen readers</div>
```

### ❌ Don't Use Placeholders as Labels
```tsx
// Bad
<input placeholder="Enter your email" />

// Good
<label htmlFor="email">Enter your email</label>
<input id="email" type="email" placeholder="example@email.com" />
```

### ❌ Don't Skip Heading Levels
```tsx
// Bad
<h1>Page Title</h1>
<h4>Section Title</h4>

// Good
<h1>Page Title</h1>
<h2>Section Title</h2>
```

---

## Useful CSS Classes

Already available in the codebase:

```css
/* Screen reader only */
.sr-only

/* Focus visible (keyboard navigation) */
*:focus-visible

/* Skip link */
a[href="#main-content"]
```

## Browser Extensions for Testing

1. **axe DevTools** - Automated accessibility testing
2. **WAVE** - Web accessibility evaluation
3. **Lighthouse** - Built into Chrome DevTools
4. **HeadingsMap** - Visualize heading structure
5. **Accessibility Insights** - Microsoft's testing tool

---

## Resources

### Internal Documentation
- [SEO_AND_ACCESSIBILITY_IMPROVEMENTS.md](./SEO_AND_ACCESSIBILITY_IMPROVEMENTS.md)
- [ACCESSIBILITY_STATEMENT_TEMPLATE.md](./ACCESSIBILITY_STATEMENT_TEMPLATE.md)

### External Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Articles](https://webaim.org/articles/)

---

## Questions or Issues?

If you have questions about implementing accessibility or SEO features:
1. Check this guide first
2. Review the comprehensive documentation in `SEO_AND_ACCESSIBILITY_IMPROVEMENTS.md`
3. Ask in the #accessibility Slack channel
4. Contact the frontend team lead

---

**Remember**: Accessibility and SEO should be considered from the beginning of development, not as an afterthought. Build with all users in mind!

