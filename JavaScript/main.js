// JavaScript/main.js
// Safe, defensive script for pages: schedule tabs, BMI calculator, contact form validation
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- SCHEDULE TABS ---------- */
  (function setupScheduleTabs(){
    const tabs = document.querySelectorAll('.day-tab');
    const grids = document.querySelectorAll('.schedule-grid');
    if(!tabs || tabs.length === 0) return;
    tabs.forEach(tab => {
      tab.addEventListener('click', function(){
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const day = tab.dataset.day;
        if(!day) return;
        grids.forEach(g => g.classList.remove('active'));
        const target = document.getElementById(day);
        if(target) target.classList.add('active');
      });
    });
  })();

  /* ---------- BMI Calculator (nutrition page) ---------- */
  (function setupBMI(){
    const calcBtn = document.querySelector('.bmi-btn');
    if(!calcBtn) return;
    calcBtn.addEventListener('click', function(){
      const hEl = document.getElementById('height');
      const wEl = document.getElementById('weight');
      const resEl = document.getElementById('bmi-result');
      if(!hEl || !wEl || !resEl) return;
      const h = parseFloat(hEl.value);
      const w = parseFloat(wEl.value);
      if(!h || !w){ resEl.innerText = 'Please enter a valid height and weight.'; return; }
      const bmi = (w / ((h/100)**2)).toFixed(1);
      resEl.innerText = 'Your BMI: ' + bmi;
    });
  })();

  /* ---------- Contact form validation ---------- */
  (function setupContactValidation(){
    const form = document.getElementById('contact-form');
    if(!form) return;
    const feedback = document.getElementById('form-feedback');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('fullname');
      const email = document.getElementById('email');
      const address = document.getElementById('address');
      const tel = document.getElementById('tel');

      let errors = [];
      if(!name || name.value.trim().length < 2) errors.push('Please enter your full name.');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!email || !emailPattern.test(email.value)) errors.push('Please enter a valid email.');
      if(!address || address.value.trim().length < 5) errors.push('Please enter a valid address.');
      const telPattern = /^\+?[0-9\s\-]{7,15}$/;
      if(!tel || !telPattern.test(tel.value)) errors.push('Please enter a valid telephone number.');

      if(errors.length){
        if(feedback) { feedback.innerText = errors.join(' '); feedback.style.color = '#cc0000'; feedback.focus(); }
        return;
      }

      // If validation passes - simulate handler or instruct student to wire to real handler
      if(feedback) {
        feedback.innerText = "Thanks — your message is validated and would be submitted to a handler.";
        feedback.style.color = '#2b7a2b';
      }
      form.reset();
    });
  })();

  /* ---------- Accessibility / minor helpers ---------- */
  document.querySelectorAll('img').forEach(img => {
    if(!img.hasAttribute('alt')) img.setAttribute('alt','image');
  });

});
