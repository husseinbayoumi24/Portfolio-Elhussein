const body=document.body;
const themeToggle=document.getElementById("themeToggle");
const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("nav");

const savedTheme=localStorage.getItem("hb-theme");
if(savedTheme==="light") body.classList.add("light");
themeToggle.textContent=body.classList.contains("light")?"☀":"☾";

themeToggle.addEventListener("click",()=>{
  body.classList.toggle("light");
  const light=body.classList.contains("light");
  localStorage.setItem("hb-theme",light?"light":"dark");
  themeToggle.textContent=light?"☀":"☾";
});

const backdrop=document.querySelector(".mobile-menu-backdrop");
const setMenu=(open)=>{
  nav.classList.toggle("open",open);
  body.classList.toggle("menu-open",open);
  menuToggle.setAttribute("aria-expanded",open?"true":"false");
  menuToggle.setAttribute("aria-label",open?"Close menu":"Open menu");
  menuToggle.textContent=open?"×":"☰";
};
setMenu(false);
menuToggle.addEventListener("click",(e)=>{e.stopPropagation();setMenu(!nav.classList.contains("open"));});
if(backdrop) backdrop.addEventListener("click",()=>setMenu(false));
document.addEventListener("click",(e)=>{
  if(!nav.classList.contains("open")) return;
  if(!nav.contains(e.target) && e.target!==menuToggle) setMenu(false);
});
document.querySelectorAll(".nav-link").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false);});
window.addEventListener("resize",()=>{if(window.innerWidth>900)setMenu(false);});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("visible");
      revealObserver.unobserve(e.target);
    }
  });
},{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const sections=[...document.querySelectorAll("section[id]")];
const navLinks=[...document.querySelectorAll(".nav-link")];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{threshold:.45});
sections.forEach(s=>sectionObserver.observe(s));

const filters=document.querySelectorAll(".filter");
const projects=document.querySelectorAll(".project-card");
const projectDetails={
  "RAI-ZEN Cafe Analysis":{
    drive:"https://drive.google.com/drive/folders/1HFdU6VJOPY3nTbImhfMtXUcXes0BKigx?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/Excel/RAI-ZEN%20Cafe%20Sales",
    description:"Tracks 1,313 orders and 42,628 in sales, with views of popular coffee, monthly and daily orders, payment methods, and shift demand.",
    images:[{src:"Photo/project excel/Dashboard RAI-ZEN Cafe.webp",alt:"RAI-ZEN Cafe sales dashboard",caption:"Sales, orders, and item KPIs alongside coffee popularity, monthly and daily order trends, payment mix, and shift activity."}]
  },
  "Customer Demographics & Income":{
    drive:"https://drive.google.com/drive/folders/1ItS21ikTSELzELbI_MChQMw062rMozna?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/Excel/Customer%20Demographics%20%26%20Income",
    description:"Compares age and income across education, region, marital status, and gender, with headline age and income measures.",
    images:[{src:"Photo/project excel/Customer Demographics & Income Dashboard.webp",alt:"Customer demographics and income dashboard",caption:"Age-group income trends, education mix, regional income, marital-status comparisons, gender breakdown, and age and income KPIs."}]
  },
  "ElectroTech Egypt":{
    drive:"https://drive.google.com/drive/folders/1c8Yv39_8IV_QTnLuW7L4Mc9BRPC4R3Ow?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/Excel/ElectroTech%20Egypt",
    description:"Reviews sales, cost, profit margin, and profit by city, channel, region, and product, with year and channel filters.",
    images:[{src:"Photo/project excel/ElectroTech Egypt Dashboard.webp",alt:"ElectroTech Egypt sales dashboard",caption:"Sales and profit KPIs, city and channel comparisons, top products, and regional sales with year and channel filters."}]
  },
  "FNP Sales":{
    drive:"https://drive.google.com/drive/folders/19-K7JFqOaB_TF6DLCXKHR8sGCXubGdqx?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/Excel/FNP%20Sales",
    description:"Summarizes revenue, quantity, delivery time, and orders, then compares monthly sales, occasions, products, and top sellers.",
    images:[{src:"Photo/project excel/Dashboard FNP Sales.webp",alt:"FNP sales analysis dashboard",caption:"Revenue, quantity, delivery, and order KPIs; monthly sales, occasion-level revenue, and the top products and sellers."}]
  },
  "Sales Performance & Product (2016–2018)":{
    drive:"https://drive.google.com/drive/folders/1t9M1cZslRkcmOnquLWKB5Ik5JoD-n2Rc?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/Excel/Sales%20Performance%20%26%20Product%20(2016%E2%80%932018)",
    description:"Compares sales by month, year, category, and product across 2016–2018, alongside quantity and product-count measures.",
    images:[{src:"Photo/project excel/Dashboard Sales Performance & Product (2016–2018).webp",alt:"Sales and product performance dashboard for 2016 to 2018",caption:"Monthly sales trend, yearly sales split, category and product comparisons, plus total sales and quantity measures."}]
  },
  "Home E-Commerce Retail Pulse":{
    title:"E-Commerce Retail Pulse",
    drive:"https://drive.google.com/drive/folders/1pWit5Q8H9Nmprj7m1nAyn4FYcZVlxyFN?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/PowerBI/E-Commerce%20Retail%20Pulse",
    description:"A five-page retail report covering executive KPIs, customer geography, product performance, and profitability across countries and categories.",
    images:[
      {src:"Photo/project Power bi/E-Commerce Retail Pulse/Executive OverView.webp",alt:"E-commerce executive overview",caption:"Executive overview: customers, orders, revenue, margin, cost, average order value, monthly revenue, country, and category performance."},
      {src:"Photo/project Power bi/E-Commerce Retail Pulse/Home.webp",alt:"E-commerce report home page",caption:"Report home page showing navigation to the overview, product, customer, and profitability sections."},
      {src:"Photo/project Power bi/E-Commerce Retail Pulse/Customer & Geography.webp",alt:"E-commerce customer and geography analysis",caption:"Customer and geography: customer segments, gender, country revenue, customer orders, and leading customers."},
      {src:"Photo/project Power bi/E-Commerce Retail Pulse/Product Performance.webp",alt:"E-commerce product performance analysis",caption:"Product performance: revenue and profit by category and product, including top and bottom products and profit margins."},
      {src:"Photo/project Power bi/E-Commerce Retail Pulse/Profitability & Insights.webp",alt:"E-commerce profitability and insights",caption:"Profitability page comparing cost, profit, margin, year-over-year revenue, monthly profit, and category margins."}
    ]
  },
  "HR People Pulse":{
    drive:"https://drive.google.com/drive/folders/1Xb8TBrDjK9TTRTdc9UcVUGjIngb9Z7h2?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/PowerBI/HR%20People%20Pulse/Data%20File",
    description:"Explores workforce size, payroll, salary, and 17% turnover, with department comparisons by year, status, and performance.",
    images:[{src:"Photo/project Power bi/Dashboard HR People Pulse.webp",alt:"HR workforce and turnover analytics dashboard",caption:"Employee and payroll KPIs, annual payroll trend, department turnover, salary versus performance, and employee status."}]
  },
  "Office Furniture Sales":{
    drive:"https://drive.google.com/drive/folders/153LI-zkdZT4eSAFW8UUzVkwXYNFjvhMH?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/PowerBI/Office%20Furniture%20Sales",
    description:"Reviews 8,399 orders and 15M in revenue by month, region, product, customer segment, shipping method, and year.",
    images:[{src:"Photo/project Power bi/Dashboard Office Furniture Sales.webp",alt:"Office furniture sales dashboard",caption:"Orders, average order value, quantity, shipping cost, and revenue with monthly, regional, product, and customer-segment analysis."}]
  },
  "Retail Sales and Growth Strategy":{
    drive:"https://drive.google.com/drive/folders/196_ohpdH7Wfxa306oigk-h1LNP_CGuVd?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/PowerBI/Retail%20Sales%20and%20Growth%20Strategy",
    description:"Tracks orders, customers, products, sales, returns, and profit, with monthly trends and city, product, and customer-segment comparisons.",
    images:[{src:"Photo/project Power bi/Dashboard Retail Sales and Growth Strategy.webp",alt:"Retail sales and growth strategy dashboard",caption:"Retail KPIs, monthly sales and profit, city contribution, leading products, category sales, returns, and customer segments."}]
  },
  "Sales Performance & Customer Insights":{
    drive:"https://drive.google.com/drive/folders/18El5l5anvbnrJ77NpJGb10FYtdG5iefq?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/PowerBI/Sales%20Performance%20%26%20Customer%20Insights",
    description:"Connects revenue, profit, and sales trends with country, product category, customer, and gender comparisons.",
    images:[{src:"Photo/project Power bi/Sales Performance & Customer Insights.webp",alt:"Sales performance and customer insights dashboard",caption:"Revenue, cost, profit, and order KPIs with sales by year, month, country, product category, and customer gender."}]
  },
  "SuperMarket Sales Performance":{
    drive:"https://drive.google.com/drive/folders/1PTYZ6Zof5jvbEpUlSpe34RGIvDq2uWfO?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/PowerBI/SuperMarket%20Sales%20Performance",
    description:"Monitors quantity, sales, profit, and margin by date, city, product line, and time of day.",
    images:[{src:"Photo/project Power bi/SuperMarket Sales Performance.webp",alt:"Supermarket sales performance dashboard",caption:"Sales, quantity, profit, and margin KPIs with date trends and city, product-line, and time-of-day breakdowns."}]
  },
  "Omnichannel Retail Dashboard":{
    drive:"https://drive.google.com/drive/folders/1Fdo4CAhaGSaMZyt3V4GhejIfxhKUL0Ca?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/PowerBI/Omnichannel%20Retail",
    description:"Compares retail and wholesale sales across channels, categories, cities, customer segments, and satisfaction, with refund and profit views.",
    images:[{src:"Photo/project Power bi/Omnichannel Retail Dashboard.webp",alt:"Omnichannel retail dashboard",caption:"Units, cost, sales, and profit with monthly trends, channel split, category performance, city sales, customer satisfaction, and refunds."}]
  },
  "Bank Loans":{
    drive:"https://drive.google.com/drive/folders/1lT-7wO1qBT2HiTrWx-145XTUwRsYYngy?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/SQL/Bank%20Loans",
    description:"Summarizes loan volume, average loan, paid amounts, and deficiencies by year, product, customer segment, and status.",
    images:[{src:"Photo/project Sql/Dashboard Bank Loans.webp",alt:"Bank loan portfolio dashboard",caption:"Loan and customer KPIs with loan totals by year, product, and segment, plus paid amounts and deficiencies by product and payment method."}]
  },
  "Retail Analytics":{
    drive:"https://drive.google.com/drive/folders/1uUDKO10Q-2ZpOqTmEvx062LWb7OVVbWM?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/SQL/Retail%20Analytics",
    description:"Tracks orders, customers, products, cost, sales, and returns, with monthly profit and sales plus city and customer-segment views.",
    images:[{src:"Photo/project Sql/Dashboard Retail Analytics.webp",alt:"Retail analytics dashboard",caption:"Retail KPIs, monthly sales and profit, city contribution, product sales, returns, and customer-segment detail."}]
  },
  "E-Commerce Data Flow & Diagram":{
    title:"E-Commerce Operational Efficiency SQL Server",
    drive:"https://drive.google.com/drive/folders/1ZbFwoorOHYBxNtKvaOvsum_5HQhu1vZN?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/SQL/E-Commerce%20Operational%20Efficiency%20SQL%20Server",
    description:"Maps the e-commerce database and operational flow, with a sales report showing revenue, orders, product categories, and country comparisons.",
    images:[{src:"Photo/project Sql/Diagram e-commerce.webp",alt:"E-commerce SQL sales and data flow dashboard",caption:"E-commerce reporting view with revenue and order KPIs, yearly revenue, country order volume, product-category revenue, and monthly sales."}]
  },
  "Python Global Electronics & Smart Home Retail":{
    title:"Global Electronics & Smart Home Retail",
    drive:"https://drive.google.com/drive/folders/1DnEbDNJqK6E0zaNIHE4invLTTn5qavsG?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/Python/Global%20Electronics%20%26%20Smart%20Home%20Retail",
    description:"Combines sales, product, and customer-order views, comparing revenue, cost, profit, customer activity, and product categories.",
    images:[
      {src:"Photo/project Python/Global Electronics & Smart Home Retail/Dashboard Sales Overview1.webp",alt:"Global electronics sales overview",caption:"Sales overview: revenue, profit, and order trends by month, category, customer, and order status."},
      {src:"Photo/project Python/Global Electronics & Smart Home Retail/Dashboard Product Analysis1.webp",alt:"Global electronics product analysis",caption:"Product analysis: category and product revenue, quantity, cost, profit, and profit margin comparisons."},
      {src:"Photo/project Python/Global Electronics & Smart Home Retail/Dashboard Customers & Orders Analysis.webp",alt:"Global electronics customers and orders analysis",caption:"Customer and order analysis: customer and order totals, monthly orders, city activity, order status, and repeat-customer patterns."}
    ]
  },
  "Python Sales":{
    title:"Sales",
    drive:"https://drive.google.com/drive/folders/1DCjpFdidX1of51ARpn-dgj5-K6XUiNR0?usp=drive_link",
    github:"https://github.com/husseinbayoumi24/Portfolio-Data-Analysis0/tree/main/Python/Sales",
    description:"Analyzes orders and sales by month, region, product, customer segment, and shipping method.",
    images:[{src:"Photo/project Python/Sales/Dashbord.webp",alt:"Python sales analysis dashboard",caption:"Sales and order KPIs with monthly revenue, regional shipping cost, product and subcategory comparisons, and customer segments."}]
  }
};

filters.forEach(btn=>{
  btn.addEventListener("click",()=>{
    filters.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const type=btn.dataset.filter;
    projects.forEach(card=>{
      card.classList.toggle("hidden",type!=="all" && card.dataset.type!==type);
    });
  });
});

projects.forEach(card=>{
  const body=card.querySelector(".project-body");
  if(!body) return;
  const details=projectDetails[card.dataset.title];
  if(details){
    card.dataset.drive=details.drive;
    card.dataset.github=details.github;
    card.dataset.title=details.title||card.dataset.title;
    card.dataset.description=details.description;
    card.dataset.image=details.images[0].src;
    const heading=body.querySelector("h3");
    if(heading) heading.textContent=card.dataset.title;
    const preview=card.querySelector(".project-image img");
    if(preview){
      preview.src=details.images[0].src;
      preview.alt=details.images[0].alt;
      preview.loading="lazy";
      preview.decoding="async";
    }
    const summary=[...body.querySelectorAll("p")].find(p=>!p.classList.contains("project-type")&&!p.classList.contains("project-date")&&!p.classList.contains("project-report"));
    if(summary){
      summary.classList.add("project-summary");
      summary.textContent=details.description;
    }
    const links=document.createElement("div");
    links.className="project-links";
    [["Drive",details.drive],["GitHub",details.github]].forEach(([label,url])=>{
      const link=document.createElement("a");
      link.className="project-link";
      link.href=url;
      link.target="_blank";
      link.rel="noopener";
      link.textContent=`${label} ↗`;
      links.appendChild(link);
    });
    const caseButton=body.querySelector(".case-btn");
    if(caseButton) body.insertBefore(links,caseButton);
    card.projectImages=details.images;
  }
  const report=card.dataset.report;
  if(report && !body.querySelector(".project-report")) {
    const reportEl=document.createElement("p");
    reportEl.className="project-report";
    reportEl.textContent=`Report: ${report}`;
    body.appendChild(reportEl);
  }
});

const modal=document.getElementById("projectModal");
const closeModal=()=>{
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  body.classList.remove("modal-open");
};
document.getElementById("modalClose").addEventListener("click",closeModal);
document.querySelector(".modal-backdrop").addEventListener("click",closeModal);

projects.forEach(card=>{
  card.addEventListener("click",event=>{
    if(event.target.closest("a")) return;
    const d=card.dataset;
    const gallery=document.getElementById("modalGallery");
    const images=card.projectImages||[{src:d.image,alt:d.title,caption:d.description}];
    gallery.replaceChildren(...images.map(image=>{
      const figure=document.createElement("figure");
      const img=document.createElement("img");
      const caption=document.createElement("figcaption");
      img.src=image.src;
      img.alt=image.alt;
      caption.textContent=image.caption;
      figure.append(img,caption);
      return figure;
    }));
    document.getElementById("modalType").textContent=d.type.toUpperCase();
    document.getElementById("modalDate").textContent=card.querySelector(".project-date")?.textContent || "Project date: 2025";
    document.getElementById("modalTitle").textContent=d.title;
    document.getElementById("modalDescription").textContent=d.description;
    document.getElementById("modalDid").textContent=d.did;
    document.getElementById("modalProblem").textContent=d.problem;
    document.getElementById("modalSolution").textContent=d.solution;
    document.getElementById("modalReport").textContent=d.report;
    document.getElementById("modalDrive").href=d.drive;
    document.getElementById("modalGithub").href=d.github;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    body.classList.add("modal-open");
  });
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape")closeModal();
});

const topBtn=document.getElementById("topBtn");
window.addEventListener("scroll",()=>{
  topBtn.classList.toggle("show",window.scrollY>600);
});
topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

/* Final safety patch: profile image is pulse-only, never spinning. */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(
    ".profile-orbit,.profile-ring,.profile-ring-outer,.profile-photo-ring"
  ).forEach(el => {
    el.style.animation = "none";
    el.style.transform = "none";
  });

  document.querySelectorAll(
    ".profile-photo,.profile-image,.profile-avatar,.profile-picture"
  ).forEach(el => {
    el.style.animation = "profileHeartbeatMax 1.15s ease-in-out infinite";
    el.style.transformOrigin = "center";
  });
});
