(function () {
  var WA = '919503248068';

  // Mobile menu
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Highlight current page
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a:not(.btn)').forEach(function (a) {
    if (a.getAttribute('href') === page) a.setAttribute('aria-current', 'page');
  });

  // Preselect service from ?service=
  var wanted = new URLSearchParams(location.search).get('service');

  document.querySelectorAll('.sw-form').forEach(function (form) {
    var sel = form.elements.service;
    if (wanted) {
      Array.prototype.forEach.call(sel.options, function (o) {
        if (o.value === wanted || o.text === wanted) sel.value = o.value || o.text;
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = form.querySelector('.err');
      var name = form.elements.name.value.trim();
      var phone = form.elements.phone.value.replace(/[\s\-().]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
      var service = sel.value;
      var message = form.elements.message.value.trim();

      if (!name) { err.textContent = 'Please enter your full name.'; form.elements.name.focus(); return; }
      if (!/^[6-9]\d{9}$/.test(phone)) { err.textContent = 'Please enter a valid 10-digit Indian mobile number.'; form.elements.phone.focus(); return; }
      if (!service) { err.textContent = 'Please select a service.'; sel.focus(); return; }
      err.textContent = '';

      var text = 'Hello SK Wheels Multibrand Workshop,\n\n' +
        'I would like to enquire about your car service.\n\n' +
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Service Required: ' + service + '\n' +
        'Message: ' + (message || 'Not provided') + '\n\n' +
        'Please contact me regarding this service.';

      window.location.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text);
    });
  });
})();
