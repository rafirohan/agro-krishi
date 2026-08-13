
document.addEventListener('DOMContentLoaded', () => {
  // --- Active Nav Link Highlighter ---
  highlightActiveNavLink();
  initNavbarScrollState();

  // --- Initialize Dynamic Components ---
  initCategoryFilters();
  initSearchFilters();
  initContactFormValidation();
  initSmoothScroll();
});

function initNavbarScrollState() {
  const navbar = document.querySelector('.navbar-agri');
  if (!navbar) return;

  const applyState = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  };

  applyState();
  window.addEventListener('scroll', applyState, { passive: true });
}

/**
 * Highlights the active menu item based on current location URL
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-agri .nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Handles category filtering on Farming Guides and Crop Details pages
 */
function initCategoryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filterable-item');

  if (!filterButtons.length || !filterItems.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active class on buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // Filter cards with smooth fade effect
      filterItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * Real-time dynamic search filter for list pages
 */
function initSearchFilters() {
  const searchInput = document.getElementById('agriSearchInput');
  const filterableItems = document.querySelectorAll('.filterable-item');

  if (!searchInput || !filterableItems.length) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    filterableItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/**
 * Client-side Bootstrap validation and simulation for Contact Form
 */
function initContactFormValidation() {
  const contactForm = document.getElementById('agriContactForm');
  const formFeedbackAlert = document.getElementById('formFeedbackAlert');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
    } else {
      contactForm.classList.add('was-validated');
      
      // Display success feedback message
      if (formFeedbackAlert) {
        formFeedbackAlert.className = 'alert alert-success mt-3 d-block';
        formFeedbackAlert.innerHTML = `
          <i class="bi bi-check-circle-fill me-2"></i>
          <strong>Thank you!</strong> Your inquiry has been submitted successfully. An agricultural expert will contact you within 24 hours.
        `;
      }
      
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    }
  }, false);
}

/**
 * Smooth scrolling behavior for internal anchor tags
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// --- DYNAMIC CROP DETAILS LOADER ---
document.addEventListener('DOMContentLoaded', () => {
  renderCropDetailsPage();
});

function renderCropDetailsPage() {
  const cropTitleElem = document.getElementById('cropName');
  if (!cropTitleElem) return; // If not on details page, exit

  // Get URL parameter: e.g. crop-details-single.html?crop=potato
  const urlParams = new URLSearchParams(window.location.search);
  const cropKey = urlParams.get('crop') || 'tomato'; // Default to tomato if empty

  const cropsDatabase = {
    rice: {
      name: "Paddy Rice",
      scientific: "Oryza sativa",
      category: "Grains",
      family: "Poaceae",
      shortDesc: "Staple cereal grain requiring clayey loam soils, high temperatures, and controlled standing water.",
      image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1200&q=80",
      overview: "Rice is one of the most widely consumed cereal grains globally. Cultivation requires well-prepared puddled fields with reliable irrigation systems.",
      climate: "Warm humid climate (20°C - 38°C)",
      soil: "Heavy clay loams or silt loams",
      ph: "5.5 to 6.5",
      water: "High (1000 - 1500 mm rainfall/irrigation)",
      maturity: "105 to 150 days",
      pests: "Stem Borer, Brown Planthopper, Rice Bug",
      diseases: "Blast, Bacterial Leaf Blight, Sheath Blight",
      harvesting: "Harvest when 80-85% of grains turn golden yellow and moisture drops to around 20%."
    },
    wheat: {
      name: "Wheat",
      scientific: "Triticum aestivum",
      category: "Grains",
      family: "Poaceae",
      shortDesc: "Cool-season cereal crop requiring well-drained loamy soil and moderate rainfall during growing season.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80",
      overview: "Wheat is a major source of plant protein and energy. It thrives in temperate regions with well-defined cool vegetative periods.",
      climate: "Cool climate during growth (15°C - 25°C)",
      soil: "Well-drained fertile loamy soil",
      ph: "6.0 to 7.0",
      water: "Moderate (450 - 650 mm)",
      maturity: "110 to 130 days",
      pests: "Aphids, Armyworms, Termites",
      diseases: "Rust (Yellow, Brown, Black), Powdery Mildew",
      harvesting: "Harvest when straw becomes dry and brittle, and grain moisture is below 14%."
    },
    maize: {
      name: "Maize (Corn)",
      scientific: "Zea mays",
      category: "Grains",
      family: "Poaceae",
      shortDesc: "Versatile cereal crop grown globally for food, livestock fodder, and industrial bio-products.",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80",
      overview: "Maize demands bright sun and rich organic soils. It is grown widely as both a field crop and sweet corn for fresh consumption.",
      climate: "Warm climate (21°C - 30°C)",
      soil: "Deep, fertile, well-drained silt loam",
      ph: "5.8 to 7.0",
      water: "Moderate to High (500 - 800 mm)",
      maturity: "90 to 120 days",
      pests: "Fall Armyworm, Corn Earworm, Stem Borer",
      diseases: "Turcicum Leaf Blight, Common Rust",
      harvesting: "Harvest field corn when silk turns dark brown and husk turns pale dry color."
    },
    potato: {
      name: "Potato",
      scientific: "Solanum tuberosum",
      category: "Vegetables",
      family: "Solanaceae",
      shortDesc: "Nutritious root tuber crop preferring loose, well-drained sandy loam soil rich in organic matter.",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80",
      overview: "Potato is an essential high-yielding food crop. Tuberization requires cool soil temperatures and proper earthing up.",
      climate: "Cool temperate (15°C - 20°C)",
      soil: "Loose, well-aerated sandy loam",
      ph: "5.2 to 6.4",
      water: "Moderate (500 - 700 mm)",
      maturity: "75 to 120 days",
      pests: "Potato Tuber Moth, Aphids, Cutworms",
      diseases: "Late Blight, Early Blight, Bacterial Wilt",
      harvesting: "Harvest tubers when leaves begin to yellow and wither. Allow skins to cure in dry shade."
    },
    tomato: {
      name: "Tomato",
      scientific: "Solanum lycopersicum",
      category: "Vegetables",
      family: "Solanaceae",
      shortDesc: "High-value vegetable crop requiring sunny climate, fertile soil, and staking support.",
      image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1200&q=80",
      overview: "Tomatoes are grown globally in open fields and greenhouses. Proper staking, pruning, and consistent watering prevent physiological disorders.",
      climate: "Warm sunny weather (21°C - 27°C)",
      soil: "Fertile, well-drained sandy loam",
      ph: "6.0 to 6.8",
      water: "Regular drip irrigation (25-35 mm weekly)",
      maturity: "70 to 90 days",
      pests: "Fruit Borer, Whiteflies, Leaf Miners",
      diseases: "Early Blight, Fusarium Wilt, Tomato Yellow Leaf Curl",
      harvesting: "Pick fruits at breaker stage for transport or full red color for local markets."
    },
    mango: {
      name: "Mango",
      scientific: "Mangifera indica",
      category: "Fruits",
      family: "Anacardiaceae",
      shortDesc: "King of tropical fruits, grown in deep, well-drained alluvial soils with distinct dry periods.",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80",
      overview: "Mango is a perennial tropical orchard crop. It requires dry dry weather during flowering to encourage pollination and fruit set.",
      climate: "Tropical / Subtropical (24°C - 35°C)",
      soil: "Deep, well-drained loamy soil",
      ph: "5.5 to 7.5",
      water: "Moderate (750 - 1000 mm annual)",
      maturity: "Perennial (3 to 5 years for grafted varieties)",
      pests: "Mango Hopper, Fruit Fly, Mealybug",
      diseases: "Anthracnose, Powdery Mildew",
      harvesting: "Harvest mature fruits when shoulders develop and skin shows slight color turn."
    }
  };

  // Retrieve selected crop or fallback to tomato
  const crop = cropsDatabase[cropKey] || cropsDatabase['tomato'];

  // Populate HTML DOM elements
  document.getElementById('pageTitle').innerText = `${crop.name} Details | Agricultural Information Hub`;
  document.getElementById('breadcrumbCropName').innerText = crop.name;
  document.getElementById('cropCategory').innerText = crop.category;
  document.getElementById('cropName').innerText = crop.name;
  document.getElementById('cropShortDesc').innerText = crop.shortDesc;
  document.getElementById('cropImage').src = crop.image;
  document.getElementById('cropImage').alt = crop.name;
  document.getElementById('cropOverview').innerText = crop.overview;
  
  document.getElementById('cropClimate').innerText = crop.climate;
  document.getElementById('cropSoil').innerText = crop.soil;
  document.getElementById('cropPh').innerText = crop.ph;
  document.getElementById('cropWater').innerText = crop.water;
  document.getElementById('cropMaturity').innerText = crop.maturity;
  document.getElementById('cropHarvesting').innerText = crop.harvesting;

  document.getElementById('cropScientific').innerText = crop.scientific;
  document.getElementById('cropFamily').innerText = crop.family;
  document.getElementById('cropPests').innerText = crop.pests;
  document.getElementById('cropDiseases').innerText = crop.diseases;
};









// Dynamic Farming Guide Renderer
document.addEventListener('DOMContentLoaded', () => {
  renderFarmingGuidePage();
});

function renderFarmingGuidePage() {
  const guideTitleElem = document.getElementById('guideTitle');
  if (!guideTitleElem) return;

  const urlParams = new URLSearchParams(window.location.search);
  const guideKey = urlParams.get('guide') || 'sri';

  const guidesDatabase = {
    sri: {
      title: "System of Rice Intensification (SRI)",
      category: "Technique",
      desc: "A step-by-step technical guide to climate-smart paddy production.",
      image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1200&q=80",
      content: "<p>The System of Rice Intensification (SRI) is an agroecological methodology for increasing the productivity of irrigated rice cultivation by changing the management of plants, soil, water, and nutrients.</p><p>Key principles include early seedling transplantation, wider spacing, weed management using mechanical weeders, and keeping soil moist rather than continuously flooded.</p>"
    },
    compost: {
      title: "Organic Composting Techniques",
      category: "Soil Health",
      desc: "Complete guide on preparing organic fertilizer on your farm.",
      image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=1200&q=80",
      content: "<p>Composting transforms organic plant waste and animal manure into nutrient-rich humus for crop nutrition.</p><p>Maintain an optimal Carbon-to-Nitrogen (C:N) ratio of 30:1 by mixing dry leaves/straw (carbon) with fresh green biomass or manure (nitrogen). Keep the heap moist and turn it every 2 weeks.</p>"
    },
    drip: {
      title: "Modern Drip Irrigation Setup",
      category: "Water Management",
      desc: "Efficient micro-irrigation system for vegetable and orchard production.",
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80",
      content: "<p>Drip irrigation saves water and fertilizer by allowing water to drip slowly directly to the roots of plants, either onto the soil surface or directly onto the root zone.</p><p>It prevents weed growth between rows and minimizes evaporation loss significantly.</p>"
    }
  };

  const selectedGuide = guidesDatabase[guideKey] || guidesDatabase['sri'];

  document.getElementById('guidePageTitle').innerText = `${selectedGuide.title} | Agricultural Information Hub`;
  document.getElementById('breadcrumbGuideTitle').innerText = selectedGuide.title;
  document.getElementById('guideCategory').innerText = selectedGuide.category;
  document.getElementById('guideTitle').innerText = selectedGuide.title;
  document.getElementById('guideDesc').innerText = selectedGuide.desc;
  document.getElementById('guideImage').src = selectedGuide.image;
  document.getElementById('guideContent').innerHTML = selectedGuide.content;
};

// ==========================================
// Dynamic Guide Details Renderer
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderDynamicGuideDetails();
});

function renderDynamicGuideDetails() {
  // URL থেকে ?guide= প্যারামিটার নেওয়া (যেমন: tomato, sri, compost)
  const urlParams = new URLSearchParams(window.location.search);
  const guideKey = urlParams.get('guide') || 'sri';

  // সকল গাইডের তথ্য ডাটাবেজ
  const guidesDatabase = {
    sri: {
      title: "System of Rice Intensification (SRI)",
      category: "Rice Farming",
      desc: "Comprehensive guide to climate-resilient rice farming with reduced seed usage and optimized water application.",
      image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>The System of Rice Intensification (SRI) is an agroecological methodology for increasing the productivity of irrigated rice cultivation by changing the management of plants, soil, water, and nutrients.</p>
        <h4>Key Steps:</h4>
        <ul>
          <li><strong>Early Transplanting:</strong> Transplant young seedlings (8-12 days old) with just two leaves.</li>
          <li><strong>Wide Spacing:</strong> Plant single seedlings in a square grid pattern (25cm x 25cm).</li>
          <li><strong>Moist Soil:</strong> Keep the soil moist instead of continuous flooding to encourage root aeration.</li>
        </ul>
      `
    },
    tomato: {
      title: "Commercial Tomato Cultivation",
      category: "Vegetable Farming",
      desc: "Master seedling nursery management, disease resistance, and post-harvest handling for tomato crops.",
      image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>Commercial tomato production requires strategic soil preparation, seedling health management, and vertical staking systems for high yield.</p>
        <h4>Key Steps:</h4>
        <ul>
          <li><strong>Nursery Care:</strong> Use coco-peat nursery trays to grow healthy pathogen-free seedlings.</li>
          <li><strong>Staking & Pruning:</strong> Provide bamboo support (staking) and remove sucker branches for larger fruit size.</li>
          <li><strong>Blight Management:</strong> Apply preventive copper-based fungicides to protect against early and late blight.</li>
        </ul>
      `
    },
    compost: {
      title: "Organic Bio-Fertilizers & Compost",
      category: "Organic Farming",
      desc: "How to prepare vermicompost, bio-slurry, and green manure crops to build long-term soil carbon.",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>Composting transforms organic waste into valuable humus, enriching soil microbiology and reducing fertilizer dependency.</p>
        <h4>Key Steps:</h4>
        <ul>
          <li><strong>C:N Ratio Balance:</strong> Mix dry leaves (brown carbon) with animal manure or green waste (nitrogen) in a 3:1 ratio.</li>
          <li><strong>Moisture Control:</strong> Maintain 50-60% moisture levels in the compost pile.</li>
          <li><strong>Aeration:</strong> Turn the heap every 14 days to accelerate aerobic decomposition.</li>
        </ul>
      `
    },
    soil: {
      title: "Soil Testing & Nutrient Management",
      category: "Soil Management",
      desc: "Step-by-step protocol for collecting soil samples and interpreting NPK laboratory test reports.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>Accurate soil testing helps determine exact fertilizer requirements, preventing nutrient lock-up and soil acidification.</p>
        <h4>Key Steps:</h4>
        <ul>
          <li><strong>Sampling:</strong> Collect V-shaped core samples from 10-15 locations across the field at 15cm depth.</li>
          <li><strong>pH Adjustment:</strong> Apply agricultural lime to acidic soils or sulfur to alkaline soils as per lab advice.</li>
          <li><strong>Targeted NPK:</strong> Balance Nitrogen, Phosphorus, and Potassium based on specific crop requirements.</li>
        </ul>
      `
    },
    mango: {
      title: "High-Density Mango Farming",
      category: "Fruit Farming",
      desc: "Pruning techniques, canopy management, and flowering synchronization for tropical orchards.",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>High-Density Planting (HDP) increases mango yield per acre significantly by accommodating 400+ trees per hectare.</p>
        <h4>Key Steps:</h4>
        <ul>
          <li><strong>Canopy Pruning:</strong> Prune trees annually right after harvest to maintain a manageable height (2.5 - 3 meters).</li>
          <li><strong>Drip Fertigation:</strong> Deliver nutrients directly through roots to support fruit set and growth.</li>
          <li><strong>Pest Control:</strong> Manage mango hoppers and fruit flies using yellow sticky traps and pheromone lures.</li>
        </ul>
      `
    },
    drip: {
      title: "Precision Drip Irrigation Systems",
      category: "Modern Farming",
      desc: "Design and installation guide for water-saving drip emitters and automated fertigation units.",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80",
      content: `
        <p>Drip irrigation delivers water and water-soluble fertilizers straight to the plant roots, saving up to 60% water.</p>
        <h4>Key Steps:</h4>
        <ul>
          <li><strong>Filtration Unit:</strong> Install screen and disc filters to prevent lateral clogging.</li>
          <li><strong>Emitter Placement:</strong> Space inline drip emitters 30-50 cm apart depending on soil texture.</li>
          <li><strong>Pressure Control:</strong> Maintain operating pressure around 1.0 to 1.5 bar for uniform water flow.</li>
        </ul>
      `
    }
  };

  const currentGuide = guidesDatabase[guideKey] || guidesDatabase['sri'];


  const titleElem = document.getElementById('guideTitle');
  const categoryElem = document.getElementById('guideCategory');
  const descElem = document.getElementById('guideDesc');
  const imgElem = document.getElementById('guideImage');
  const contentElem = document.getElementById('guideContent');
  const breadcrumbElem = document.getElementById('breadcrumbGuideTitle');

  if (titleElem) titleElem.innerText = currentGuide.title;
  if (categoryElem) categoryElem.innerText = currentGuide.category;
  if (descElem) descElem.innerText = currentGuide.desc;
  if (imgElem) imgElem.src = currentGuide.image;
  if (contentElem) contentElem.innerHTML = currentGuide.content;
  if (breadcrumbElem) breadcrumbElem.innerText = currentGuide.title;
}