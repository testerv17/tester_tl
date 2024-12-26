document.addEventListener('DOMContentLoaded', () => {
  // Mode Switch Logic
  const modeSwitch = document.querySelector('.mode-switch');
  if (modeSwitch) {
    modeSwitch.addEventListener('click', () => {
      document.documentElement.classList.toggle('light');
      modeSwitch.classList.toggle('active');
    });
  }

  // View Toggle Logic
  const gridButton = document.querySelector('.grid');
  const listButton = document.querySelector('.list');
  const productsWrapper = document.querySelector('.products-area-wrapper');

  if (gridButton && listButton && productsWrapper) {
    gridButton.addEventListener('click', () => {
      listButton.classList.remove('active');
      gridButton.classList.add('active');
      productsWrapper.classList.add('gridView');
      productsWrapper.classList.remove('tableView');
    });

    listButton.addEventListener('click', () => {
      listButton.classList.add('active');
      gridButton.classList.remove('active');
      productsWrapper.classList.remove('gridView');
      productsWrapper.classList.add('tableView');
    });
  }

  // Tab Switching Logic
  window.showTab = function (tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
      activeTab.style.display = 'block';

      // Dynamically load admin_dash.html into Trabajos tab
      if (tabId === 'trabajos') {
        const trabajosTab = document.getElementById('trabajos');
        if (!document.getElementById('admin-dash-frame')) {
          const iframe = document.createElement('iframe');
          iframe.id = 'admin-dash-frame';
          iframe.src = 'admin_dash.html';
          iframe.style.width = '100%';
          iframe.style.height = 'calc(100vh - 50px)';
          iframe.style.border = 'none';
          trabajosTab.innerHTML = ''; // Clear placeholder content
          trabajosTab.appendChild(iframe);
        }
      }
    }
  };

  // Load Evidencias Content
  window.loadV3Evidencias = function () {
    const evidenciasContainer = document.getElementById('evidencias-container');
    evidenciasContainer.innerHTML = '<p>Loading evidencias...</p>'; // Placeholder

    // Example mock data for demonstration purposes
    const mockEvidencias = [
      { id: 1, title: 'Evidence 1', description: 'Description for evidence 1' },
      { id: 2, title: 'Evidence 2', description: 'Description for evidence 2' },
      { id: 3, title: 'Evidence 3', description: 'Description for evidence 3' },
    ];

    // Generate HTML for mock evidencias
    evidenciasContainer.innerHTML = mockEvidencias.map(item => `
      <div class="products-row">
        <div class="product-cell">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </div>
    `).join('');
  };

  // Automatically load evidencias when clicking the "Evidencias" tab
  const evidenciasTab = document.querySelector('.evidencias-tab');
  if (evidenciasTab) {
    evidenciasTab.addEventListener('click', () => {
      window.loadV3Evidencias();
    });
  }
});
