// Manakish Calculator - Main JavaScript

// Add this near the top of the file, before any other functions
function debounce(func, wait = 300) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Add this near the top of the file, before any other functions
const CURRENCY_SYMBOLS = {
  GBP: '£',
  USD: '$',
  EUR: '€'
};

const CURRENCY_RATES = {
  GBP: 1,
  USD: 1.27, // Example rate: 1 GBP = 1.27 USD
  EUR: 1.17  // Example rate: 1 GBP = 1.17 EUR
};

function formatPrice(amount, currency = 'GBP') {
  const symbol = CURRENCY_SYMBOLS[currency];
  const rate = CURRENCY_RATES[currency];
  const convertedAmount = amount * rate;
  return `${symbol}${convertedAmount.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", function() {
  // DOM Cache - Store frequently accessed elements to improve performance
  const domElements = {
    // Tabs
    tabs: document.querySelectorAll('.tab'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Global price controls
    globalShowPricesBtn: document.getElementById('globalShowPricesBtn'),
    globalCurrencySelector: document.getElementById('globalCurrencySelector'),
    
    // Dough calculator inputs
    doughIngredientsTable: document.getElementById('dough-ingredients-table'),
    ingredientWeights: document.querySelectorAll('.ingredient-weight'),
    totalDoughWeight: document.getElementById('totalDoughWeight'),
    totalDoughCost: document.getElementById('totalDoughCost'),
    
    // Batch calculator
    doughBalls: document.getElementById('doughBalls'),
    ballWeight: document.getElementById('ballWeight'),
    batchResults: document.getElementById('batchResults'),
    numBatches: document.getElementById('numBatches'),
    eachBatchWeight: document.getElementById('eachBatchWeight'),
    
    // Recipe analysis
    hydrationValue: document.getElementById('hydrationValue'),
    saltValue: document.getElementById('saltValue'),
    oilValue: document.getElementById('oilValue'),
    yeastValue: document.getElementById('yeastValue'),
    sugarValue: document.getElementById('sugarValue'),
    totalDoughInfo: document.getElementById('totalDoughInfo'),
    
    // Custom ingredient inputs
    addCustomIngredient: document.getElementById('addCustomIngredient'),
    customIngredientForm: document.getElementById('customIngredientForm'),
    customIngredientName: document.getElementById('customIngredientName'),
    customIngredientWeight: document.getElementById('customIngredientWeight'),
    customIngredientPrice: document.getElementById('customIngredientPrice'),
    saveCustomIngredient: document.getElementById('saveCustomIngredient'),
    cancelCustomIngredient: document.getElementById('cancelCustomIngredient'),
    
    // Za'atar calculator inputs
    zaatarServings: document.getElementById('zaatarServings'),
    zaatarPerPiece: document.getElementById('zaatarPerPiece'),
    zaatarIngredientAmounts: document.querySelectorAll('.zaatar-ingredient-amount'),
    zaatarMixWeight: document.getElementById('zaatarMixWeight'),
    zaatarMixCost: document.getElementById('zaatarMixCost'),
    zaatarResult: document.getElementById('zaatarResult'),
    showToppingPricesBtn: document.getElementById('showToppingPricesBtn'),
    
    // Za'atar custom ingredient inputs
    addZaatarIngredient: document.getElementById('addZaatarIngredient'),
    zaatarIngredientForm: document.getElementById('zaatarIngredientForm'),
    zaatarIngredientName: document.getElementById('zaatarIngredientName'),
    zaatarIngredientAmount: document.getElementById('zaatarIngredientAmount'),
    zaatarIngredientPrice: document.getElementById('zaatarIngredientPrice'),
    saveZaatarIngredient: document.getElementById('saveZaatarIngredient'),
    cancelZaatarIngredient: document.getElementById('cancelZaatarIngredient'),
    
    // Cheese calculator inputs
    cheeseServings: document.getElementById('cheeseServings'),
    cheesePerPiece: document.getElementById('cheesePerPiece'),
    cheeseIngredientPercents: document.querySelectorAll('.cheese-ingredient-percent'),
    cheesePercentTotal: document.getElementById('cheesePercentTotal'),
    cheeseMixCost: document.getElementById('cheeseMixCost'),
    cheeseProportionError: document.getElementById('cheeseProportionError'),
    cheeseResult: document.getElementById('cheeseResult'),
    
    // Cheese custom ingredient inputs
    addCheeseIngredient: document.getElementById('addCheeseIngredient'),
    cheeseIngredientForm: document.getElementById('cheeseIngredientForm'),
    cheeseIngredientName: document.getElementById('cheeseIngredientName'),
    cheeseIngredientPercent: document.getElementById('cheeseIngredientPercent'),
    cheeseIngredientPrice: document.getElementById('cheeseIngredientPrice'),
    saveCheeseIngredient: document.getElementById('saveCheeseIngredient'),
    cancelCheeseIngredient: document.getElementById('cancelCheeseIngredient'),
    
    // Meat calculator inputs
    meatServings: document.getElementById('meatServings'),
    meatPerPiece: document.getElementById('meatPerPiece'),
    meatIngredientAmounts: document.querySelectorAll('.meat-ingredient-amount'),
    meatMixWeight: document.getElementById('meatMixWeight'),
    meatMixCost: document.getElementById('meatMixCost'),
    meatResult: document.getElementById('meatResult'),
    
    // Meat custom ingredient inputs
    addMeatIngredient: document.getElementById('addMeatIngredient'),
    meatIngredientForm: document.getElementById('meatIngredientForm'),
    meatIngredientName: document.getElementById('meatIngredientName'),
    meatIngredientAmount: document.getElementById('meatIngredientAmount'),
    meatIngredientPrice: document.getElementById('meatIngredientPrice'),
    saveMeatIngredient: document.getElementById('saveMeatIngredient'),
    cancelMeatIngredient: document.getElementById('cancelMeatIngredient'),
    
    // Banana Chocolate calculator inputs
    bananaServings: document.getElementById('bananaServings'),
    bananaPerPiece: document.getElementById('bananaPerPiece'),
    bananaIngredientAmounts: document.querySelectorAll('.banana-ingredient-amount'),
    bananaMixWeight: document.getElementById('bananaMixWeight'),
    bananaMixCost: document.getElementById('bananaMixCost'),
    bananaResult: document.getElementById('bananaResult'),
    
    // Banana Chocolate custom ingredient inputs
    addBananaIngredient: document.getElementById('addBananaIngredient'),
    bananaIngredientForm: document.getElementById('bananaIngredientForm'),
    bananaIngredientName: document.getElementById('bananaIngredientName'),
    bananaIngredientAmount: document.getElementById('bananaIngredientAmount'),
    bananaIngredientPrice: document.getElementById('bananaIngredientPrice'),
    saveBananaIngredient: document.getElementById('saveBananaIngredient'),
    cancelBananaIngredient: document.getElementById('cancelBananaIngredient'),
    
    // Summary tab
    summaryProduction: document.getElementById('summary-production'),
    summaryDough: document.getElementById('summary-dough'),
    summaryToppings: document.getElementById('summary-toppings'),
    summaryCosts: document.getElementById('summary-costs'),
    
    // Share and print elements
    shareRecipe: document.getElementById('shareRecipe'),
    copyRecipe: document.getElementById('copyRecipe'),
    printRecipe: document.getElementById('printRecipe'),
    shareModal: document.getElementById('shareModal'),
    shareUrl: document.getElementById('shareUrl'),
    copyShareUrl: document.getElementById('copyShareUrl'),
    closeButtons: document.querySelectorAll('.close-button'),
    
    // Topping sharing
    shareToppings: document.getElementById('shareToppings'),
    copyToppings: document.getElementById('copyToppings'),
    printToppings: document.getElementById('printToppings'),
    shareToppingsModal: document.getElementById('shareToppingsModal'),
    shareToppingsUrl: document.getElementById('shareToppingsUrl'),
    copyToppingsShareUrl: document.getElementById('copyToppingsShareUrl'),
    
    // BOQ printing
    printBOQ: document.getElementById('printBOQ'),
    
    // Toast notification
    copyConfirmation: document.getElementById('copyConfirmation'),
    copyMessage: document.getElementById('copyMessage'),
    
    // Print elements
    printDate: document.getElementById('print-date'),
    printFooterDate: document.getElementById('print-footer-date'),
    printRecipeTable: document.getElementById('print-recipe-table'),
    printRecipeDetails: document.getElementById('print-recipe-details'),
    printDoughNotes: document.getElementById('print-dough-notes'),
    printZaatarTable: document.getElementById('print-zaatar-table'),
    printZaatarDetails: document.getElementById('print-zaatar-details'),
    printCheeseTable: document.getElementById('print-cheese-table'),
    printCheeseDetails: document.getElementById('print-cheese-details'),
    printMeatTable: document.getElementById('print-meat-table'),
    printMeatDetails: document.getElementById('print-meat-details'),
    printBananaTable: document.getElementById('print-banana-table'),
    printBananaDetails: document.getElementById('print-banana-details'),
    printBoqTable: document.getElementById('print-boq-table'),
    currencySelector: document.getElementById('currencySelector'),
    toppingCurrencySelector: document.getElementById('toppingCurrencySelector'),
  };
  
  // State object to hold current calculator values
  const state = {
    activeTab: 'dough',
    showPrices: false,
    showToppingPrices: false,
    currency: {
      symbol: '£',
      code: 'GBP'
    },
    doughRecipe: {
      totalWeight: 0,
      totalCost: 0,
      ingredients: [],
      analysis: {
        hydration: 0,
        salt: 0,
        oil: 0,
        yeast: 0,
        sugar: 0
      },
      batch: {
        numBalls: 8,
        ballWeight: 107,
        numBatches: 1
      }
    },
    toppings: {
      zaatar: {
        servings: 8,
        perPiece: 20,
        totalWeight: 0,
        totalCost: 0,
        ingredients: []
      },
      cheese: {
        servings: 8,
        perPiece: 50,
        totalCost: 0,
        cheeseTypes: []
      },
      meat: {
        servings: 8,
        perPiece: 50,
        totalWeight: 0,
        totalCost: 0,
        ingredients: []
      },
      banana: {
        servings: 8,
        perPiece: 50,
        totalWeight: 0,
        totalCost: 0,
        ingredients: []
      }
    }
  };
  
  // Initialize tabs
  function initTabs() {
    domElements.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Update active tab
            domElements.tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active tab content
            domElements.tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            const newActiveTab = document.getElementById(`${tabName}-tab`);
            requestAnimationFrame(() => {
                newActiveTab.classList.add('active');
                state.activeTab = tabName;
                
                // Only update summary when switching to summary tab
                if (tabName === 'summary') {
                    debouncedUpdateSummary();
                }
            });
            
            // Update URL hash
            window.location.hash = tabName;
        });
    });
    
    // Check URL hash on load to activate the right tab
    const hash = window.location.hash.substring(1);
    if (hash === 'toppings') {
        document.querySelector('.tab[data-tab="toppings"]').click();
    } else if (hash === 'summary') {
        document.querySelector('.tab[data-tab="summary"]').click();
    } else if (hash === 'dough') {
        document.querySelector('.tab[data-tab="dough"]').click();
    }
  }
  
  // Price toggle functionality
  function initPriceToggles() {
    // Global price toggle for both dough and toppings
    domElements.globalShowPricesBtn.addEventListener('click', function() {
      const isActive = this.classList.toggle('active');
      
      // Update show/hide state
      state.showPrices = isActive;
      state.showToppingPrices = isActive;
      
      // Update classes to show/hide prices
      document.body.classList.toggle('show-prices', isActive);
      document.body.classList.toggle('hidden-prices', !isActive);
      
      // Update button text
      this.innerHTML = isActive
        ? '<i class="fas fa-coins"></i> <span>Hide Pricing</span>'
        : '<i class="fas fa-coins"></i> <span>Pricing</span>';
      
      // Display or hide currency selector with improved styling
      if (isActive) {
        domElements.globalCurrencySelector.style.display = 'inline-flex';
        // No need to set explicit height as we've handled this in CSS
      } else {
        domElements.globalCurrencySelector.style.display = 'none';
      }
      
      // Update all prices and recalculate
      updateAllPrices();
      calculateAllToppings();
    });
    
    // Initially hide prices
    document.body.classList.add('hidden-prices');
  }
  
  // Dough Calculator Functions
  function initDoughCalculator() {
    // Add event listeners to dough ingredients
    document.querySelectorAll('#dough-ingredients-table input').forEach(input => {
      input.addEventListener('input', debounce(calculateDough));
    });
    
    // Add event listeners to remove ingredient buttons
    document.querySelectorAll('#dough-ingredients-table .remove-item-button').forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        if (row && row.parentNode && !row.classList.contains('total-row')) {
          row.parentNode.removeChild(row);
          calculateDough();
        }
      });
    });
    
    // Add custom ingredient button
    domElements.addCustomIngredient.addEventListener('click', function() {
      domElements.customIngredientForm.style.display = 'block';
      domElements.customIngredientName.focus();
    });
    
    // Save custom ingredient
    domElements.saveCustomIngredient.addEventListener('click', function() {
      const name = domElements.customIngredientName.value.trim();
      const weight = parseFloat(domElements.customIngredientWeight.value) || 0;
      const price = parseFloat(domElements.customIngredientPrice.value) || 0;
      
      if (name && weight > 0) {
        addDoughIngredientRow(name, weight, price);
        resetCustomIngredientForm();
        calculateDough();
      }
    });
    
    // Cancel custom ingredient
    domElements.cancelCustomIngredient.addEventListener('click', function() {
      resetCustomIngredientForm();
    });
    
    // Batch calculator
    domElements.doughBalls.addEventListener('input', debounce(updateBatch));
    domElements.ballWeight.addEventListener('input', debounce(updateBatch));
    domElements.numBatches.addEventListener('input', debounce(updateBatch));
    
    // Initial calculations
    calculateDough();
    updateBatch();
  }
  
  function resetCustomIngredientForm() {
    domElements.customIngredientForm.style.display = 'none';
    domElements.customIngredientName.value = '';
    domElements.customIngredientWeight.value = '';
    domElements.customIngredientPrice.value = '';
  }
  
  function addDoughIngredientRow(name, weight, price) {
    const tbody = domElements.doughIngredientsTable.querySelector('tbody');
    const totalRow = tbody.querySelector('.total-row');
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${name}</td>
      <td><input type="number" class="ingredient-weight" value="${weight}" min="0"></td>
      <td class="price-column"><input type="number" class="price-input" value="${price}" min="0" step="0.1"></td>
      <td class="price-column price-display">$0.00</td>
      <td><button class="remove-item-button"><i class="fa fa-trash"></i></button></td>
    `;
    
    // Add event listeners to new inputs
    newRow.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', debounce(calculateDough));
    });
    
    // Add event listener to remove button
    newRow.querySelector('.remove-item-button').addEventListener('click', function() {
      tbody.removeChild(newRow);
      calculateDough();
    });
    
    // Insert before total row
    tbody.insertBefore(newRow, totalRow);
  }
  
  function calculateDough() {
    try {
      // Clear previous state
      state.doughRecipe.ingredients = [];
      state.doughRecipe.totalWeight = 0;
      state.doughRecipe.totalCost = 0;
      
      // Get all ingredient rows
      const ingredientRows = domElements.doughIngredientsTable.querySelectorAll('tbody tr:not(.total-row)');
      
      let flourWeight = 0;
      let waterWeight = 0;
      let saltWeight = 0;
      let oilWeight = 0;
      let yeastWeight = 0;
      let sugarWeight = 0;
      
      // Process each ingredient row
      ingredientRows.forEach(row => {
        const nameCell = row.cells[0].textContent;
        const weightInput = row.querySelector('.ingredient-weight');
        const priceInput = row.querySelector('.price-input');
        const priceDisplay = row.querySelector('.price-display');
        
        const weight = parseFloat(weightInput.value) || 0;
        const pricePerKg = parseFloat(priceInput.value) || 0;
        const cost = calculateIngredientCost(weight, pricePerKg);
        
        // Update price display with currency
        updatePriceDisplay(priceDisplay, cost);
        
        // Track specific ingredients for recipe analysis
        const ingredientType = weightInput.getAttribute('data-ingredient');
        if (ingredientType === 'flour') flourWeight += weight;
        else if (ingredientType === 'water') waterWeight += weight;
        else if (ingredientType === 'salt') saltWeight += weight;
        else if (ingredientType === 'oil') oilWeight += weight;
        else if (ingredientType === 'yeast') yeastWeight += weight;
        else if (ingredientType === 'sugar') sugarWeight += weight;
        
        // Add to total weight and cost
        state.doughRecipe.totalWeight += weight;
        state.doughRecipe.totalCost += cost;
        
        // Store ingredient data
        state.doughRecipe.ingredients.push({
          name: nameCell,
          weight: weight,
          pricePerKg: pricePerKg,
          cost: cost
        });
      });
      
      // Update total weight and cost display with currency
      domElements.totalDoughWeight.textContent = `${Math.round(state.doughRecipe.totalWeight)}g`;
      updatePriceDisplay(domElements.totalDoughCost, state.doughRecipe.totalCost);
      
      // Calculate baker's percentages
      if (flourWeight > 0) {
        const hydration = (waterWeight / flourWeight) * 100;
        const saltPercent = (saltWeight / flourWeight) * 100;
        const oilPercent = (oilWeight / flourWeight) * 100;
        const yeastPercent = (yeastWeight / flourWeight) * 100;
        const sugarPercent = (sugarWeight / flourWeight) * 100;
        
        // Store in state for later use
        state.doughRecipe.analysis = {
          hydration: hydration,
          salt: saltPercent,
          oil: oilPercent,
          yeast: yeastPercent,
          sugar: sugarPercent
        };
      }
      
      // Update batch information
      updateBatch();
      
      // Update print view
      updatePrintView();
    } catch (error) {
      console.error('Error in dough calculation:', error);
    }
  }
  
  function updateBatch() {
    // Get input values
    const numBalls = parseInt(domElements.doughBalls.value) || 0;
    const ballWeight = parseInt(domElements.ballWeight.value) || 0;
    const numBatches = parseInt(domElements.numBatches.value) || 1;
    
    // Store in state
    state.doughRecipe.batch.numBalls = numBalls;
    state.doughRecipe.batch.ballWeight = ballWeight;
    state.doughRecipe.batch.numBatches = numBatches;
    
    // Calculate total batch weight
    const totalBatchWeight = numBalls * ballWeight;
    
    // Calculate per-batch weight
    const eachBatchWeight = Math.round(totalBatchWeight / numBatches);
    domElements.eachBatchWeight.textContent = `${eachBatchWeight}g`;
    
    // Calculate scaling factor
    let scalingFactor = 1;
    if (state.doughRecipe.totalWeight > 0) {
      scalingFactor = totalBatchWeight / state.doughRecipe.totalWeight;
    }
    
    // Update the Recipe Analysis table with ingredient information
    const analysisBody = document.getElementById('recipe-analysis-body');
    analysisBody.innerHTML = ''; // Clear previous rows
    
    // Add a row for each ingredient
    state.doughRecipe.ingredients.forEach(ingredient => {
      // Calculate scaled weights
      const scaledWeight = Math.round(ingredient.weight * scalingFactor);
      const perBatchWeight = Math.round(scaledWeight / numBatches);
      
      // Calculate baker's percentage
      const flourWeight = state.doughRecipe.ingredients.find(i => i.name === 'Bread Flour')?.weight || 1;
      const percentage = ((ingredient.weight / flourWeight) * 100).toFixed(1);
      
      // Create the row
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${ingredient.name}</td>
        <td>${perBatchWeight}g</td>
        <td>${scaledWeight}g</td>
        <td>${percentage}%</td>
      `;
      analysisBody.appendChild(row);
    });
    
    // Update the total weights in the analysis table
    document.getElementById('perBatchWeight').textContent = `${eachBatchWeight}g`;
    document.getElementById('totalScaledWeight').textContent = `${totalBatchWeight}g`;
    
    // Generate recipe text for batch
    let batchText = `<strong>Batch Recipe:</strong> Makes ${numBalls} dough balls, ${ballWeight}g each.<br>`;
    batchText += `<strong>Total Batch Weight:</strong> ${totalBatchWeight}g<br>`;
    
    if (numBatches > 1) {
      batchText += `<strong>Divided into:</strong> ${numBatches} batches of ${eachBatchWeight}g each<br><br>`;
    }
    
    if (scalingFactor !== 1) {
      batchText += `<strong>Ingredients (×${scalingFactor.toFixed(2)}):</strong><br>`;
      
      if (numBatches > 1) {
        batchText += `<strong>Per Batch:</strong><br>`;
        
        state.doughRecipe.ingredients.forEach(ingredient => {
          const scaledWeight = Math.round(ingredient.weight * scalingFactor);
          const perBatchWeight = Math.round(scaledWeight / numBatches);
          batchText += `${ingredient.name}: ${perBatchWeight}g per batch (${scaledWeight}g total)<br>`;
        });
      } else {
        state.doughRecipe.ingredients.forEach(ingredient => {
          const scaledWeight = Math.round(ingredient.weight * scalingFactor);
          batchText += `${ingredient.name}: ${scaledWeight}g<br>`;
        });
      }
      
      if (state.showPrices) {
        const scaledCost = state.doughRecipe.totalCost * scalingFactor;
        const currency = domElements.globalCurrencySelector.value;
        batchText += `<strong>Total Batch Cost:</strong> ${formatPrice(scaledCost, currency)}`;
        
        if (numBatches > 1) {
          const costPerBatch = scaledCost / numBatches;
          batchText += `<br><strong>Cost per Batch:</strong> ${formatPrice(costPerBatch, currency)}`;
        }
      }
    }
    
    // Update display
    domElements.batchResults.innerHTML = batchText;
    domElements.totalDoughInfo.textContent = `Recipe makes ${numBalls} dough balls of ${ballWeight}g each.`;
  }
  
  // Za'atar Topping Calculator
  function initZaatarCalculator() {
    // Add event listeners to za'atar inputs
    domElements.zaatarServings.addEventListener('input', debounce(calculateZaatar));

    // Add event listeners to za'atar ingredients
    document.querySelectorAll('#zaatar-ingredients-table input').forEach(input => {
      input.addEventListener('input', debounce(calculateZaatar));
    });

    // Add event listeners to remove ingredient buttons
    document.querySelectorAll('#zaatar-ingredients-table .remove-item-button').forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        if (row && row.parentNode && !row.classList.contains('total-row')) {
          row.parentNode.removeChild(row);
          calculateZaatar();
        }
      });
    });

    // Add custom ingredient button
    domElements.addZaatarIngredient.addEventListener('click', function() {
      domElements.zaatarIngredientForm.style.display = 'block';
      domElements.zaatarIngredientName.focus();
    });

    // Save custom ingredient
    domElements.saveZaatarIngredient.addEventListener('click', function() {
      const name = domElements.zaatarIngredientName.value.trim();
      const amount = parseFloat(domElements.zaatarIngredientAmount.value) || 0;
      const price = parseFloat(domElements.zaatarIngredientPrice.value) || 0;
      if (name && amount > 0) {
        addZaatarIngredientRow(name, amount, price);
        resetZaatarIngredientForm();
        calculateZaatar();
      }
    });

    // Cancel custom ingredient
    domElements.cancelZaatarIngredient.addEventListener('click', function() {
      resetZaatarIngredientForm();
    });

    // Initial calculation
    calculateZaatar();
  }

  function resetZaatarIngredientForm() {
    domElements.zaatarIngredientForm.style.display = 'none';
    domElements.zaatarIngredientName.value = '';
    domElements.zaatarIngredientAmount.value = '';
    domElements.zaatarIngredientPrice.value = '';
  }

  function addZaatarIngredientRow(name, amount, price) {
    const tbody = document.querySelector('#zaatar-ingredients-table tbody');
    const totalRow = tbody.querySelector('.total-row');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${name}</td>
      <td><input type="number" class="zaatar-ingredient-amount" value="${amount}" min="0"></td>
      <td class="zaatar-total-amount">0g</td>
      <td class="price-column"><input type="number" class="price-input" value="${price}" min="0" step="0.1"></td>
      <td class="price-column price-display">$0.00</td>
      <td><button class="remove-item-button"><i class="fa fa-trash"></i></button></td>
    `;
    newRow.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', debounce(calculateZaatar));
    });
    newRow.querySelector('.remove-item-button').addEventListener('click', function() {
      tbody.removeChild(newRow);
      calculateZaatar();
    });
    tbody.insertBefore(newRow, totalRow);
  }

  function calculateZaatar() {
    try {
      state.toppings.zaatar.ingredients = [];
      state.toppings.zaatar.totalWeight = 0;
      state.toppings.zaatar.totalCost = 0;
      
      // Use fixed perPiece value since we removed the input field
      const perPiece = 20; // Default: 20g per piece
      state.toppings.zaatar.perPiece = perPiece;
      
      const servings = parseInt(domElements.zaatarServings.value) || 0;
      state.toppings.zaatar.servings = servings;
      
      const totalNeeded = servings * perPiece;
      
      const ingredientRows = document.querySelectorAll('#zaatar-ingredients-table tbody tr:not(.total-row)');
      ingredientRows.forEach(row => {
        const nameCell = row.cells[0].textContent;
        const amountInput = row.querySelector('.zaatar-ingredient-amount');
        const totalAmountCell = row.querySelector('.zaatar-total-amount');
        const priceInput = row.querySelector('.price-input');
        const priceDisplay = row.querySelector('.price-display');
        
        const amount = parseFloat(amountInput.value) || 0;
        const totalAmount = amount * servings;
        
        // Update total amount cell
        if (totalAmountCell) totalAmountCell.textContent = totalAmount + 'g';
        
        const pricePerKg = parseFloat(priceInput.value) || 0;
        const cost = (totalAmount / 1000) * pricePerKg;
        updatePriceDisplay(priceDisplay, cost);
        
        state.toppings.zaatar.totalWeight += totalAmount;
        state.toppings.zaatar.totalCost += cost;
        
        state.toppings.zaatar.ingredients.push({
          name: nameCell,
          amount: amount,
          totalAmount: totalAmount,
          pricePerKg: pricePerKg,
          cost: cost
        });
      });
      
      // Update total weight in UI
      domElements.zaatarMixWeight.textContent = `${Math.round(state.toppings.zaatar.totalWeight)}g`;
      
      // Update the total column in the total row
      const totalRow = document.querySelector('#zaatar-ingredients-table tbody tr.total-row');
      if (totalRow) {
        const totalAmountCell = totalRow.querySelector('td:nth-child(3)');
        if (totalAmountCell) totalAmountCell.textContent = `${Math.round(state.toppings.zaatar.totalWeight)}g`;
      }
      
      updatePriceDisplay(domElements.zaatarMixCost, state.toppings.zaatar.totalCost);
      domElements.zaatarResult.innerHTML = `<strong>Total Za'atar mix needed:</strong> ${Math.round(totalNeeded)}g`;
      
      updatePrintView();
    } catch (error) {
      console.error('Error in zaatar calculation:', error);
    }
  }
  
  // Cheese Topping Calculator
  function initCheeseCalculator() {
    domElements.cheeseServings.addEventListener('input', debounce(calculateCheese));
    document.querySelectorAll('#cheese-ingredients-table input').forEach(input => {
      input.addEventListener('input', debounce(calculateCheese));
    });
    document.querySelectorAll('#cheese-ingredients-table .remove-item-button').forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        if (row && row.parentNode && !row.classList.contains('total-row')) {
          row.parentNode.removeChild(row);
          calculateCheese();
        }
      });
    });
    domElements.addCheeseIngredient.addEventListener('click', function() {
      domElements.cheeseIngredientForm.style.display = 'block';
      domElements.cheeseIngredientName.focus();
    });
    domElements.saveCheeseIngredient.addEventListener('click', function() {
      const name = domElements.cheeseIngredientName.value.trim();
      const amount = parseFloat(domElements.cheeseIngredientAmount.value) || 0;
      const price = parseFloat(domElements.cheeseIngredientPrice.value) || 0;
      if (name && amount > 0) {
        addCheeseIngredientRow(name, amount, price);
        resetCheeseIngredientForm();
        calculateCheese();
      }
    });
    domElements.cancelCheeseIngredient.addEventListener('click', function() {
      resetCheeseIngredientForm();
    });
    calculateCheese();
  }

  function resetCheeseIngredientForm() {
    domElements.cheeseIngredientForm.style.display = 'none';
    domElements.cheeseIngredientName.value = '';
    domElements.cheeseIngredientAmount.value = '';
    domElements.cheeseIngredientPrice.value = '';
  }

  function addCheeseIngredientRow(name, amount, price) {
    const tbody = document.querySelector('#cheese-ingredients-table tbody');
    const totalRow = tbody.querySelector('.total-row');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${name}</td>
      <td><input type="number" class="cheese-ingredient-amount" value="${amount}" min="0"></td>
      <td class="cheese-total-amount">0g</td>
      <td class="price-column"><input type="number" class="price-input" value="${price}" min="0" step="0.1"></td>
      <td class="price-column price-display">$0.00</td>
      <td><button class="remove-item-button"><i class="fa fa-trash"></i></button></td>
    `;
    newRow.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', debounce(calculateCheese));
    });
    newRow.querySelector('.remove-item-button').addEventListener('click', function() {
      tbody.removeChild(newRow);
      calculateCheese();
    });
    tbody.insertBefore(newRow, totalRow);
  }

  function calculateCheese() {
    try {
      state.toppings.cheese.cheeseTypes = [];
      state.toppings.cheese.totalCost = 0;
      state.toppings.cheese.totalWeight = 0;
      
      // Use fixed perPiece value since we removed the input field
      const perPiece = 50; // Default: 50g per piece
      state.toppings.cheese.perPiece = perPiece;
      
      const servings = parseInt(domElements.cheeseServings.value) || 0;
      state.toppings.cheese.servings = servings;
      
      const ingredientRows = document.querySelectorAll('#cheese-ingredients-table tbody tr:not(.total-row)');
      
      ingredientRows.forEach(row => {
        const nameCell = row.cells[0].textContent;
        const amountInput = row.querySelector('.cheese-ingredient-amount');
        const totalAmountCell = row.querySelector('.cheese-total-amount');
        const priceInput = row.querySelector('.price-input');
        const priceDisplay = row.querySelector('.price-display');
        
        const amount = parseFloat(amountInput.value) || 0;
        const totalAmount = amount * servings;
        
        // Update total amount cell
        if (totalAmountCell) totalAmountCell.textContent = totalAmount + 'g';
        
        const pricePerKg = parseFloat(priceInput.value) || 0;
        const cost = (totalAmount / 1000) * pricePerKg;
        updatePriceDisplay(priceDisplay, cost);
        
        state.toppings.cheese.totalWeight += totalAmount;
        state.toppings.cheese.totalCost += cost;
        
        state.toppings.cheese.cheeseTypes.push({
          name: nameCell,
          amount: amount,
          totalAmount: totalAmount,
          pricePerKg: pricePerKg,
          cost: cost
        });
      });
      
      // Update UI
      const totalRow = document.querySelector('#cheese-ingredients-table tbody tr.total-row');
      if (totalRow) {
        const totalAmountCell = totalRow.querySelector('td:nth-child(3)');
        if (totalAmountCell) totalAmountCell.textContent = `${Math.round(state.toppings.cheese.totalWeight)}g`;
      }
      
      updatePriceDisplay(domElements.cheeseMixCost, state.toppings.cheese.totalCost);
      domElements.cheeseResult.innerHTML = `<strong>Total cheese mix needed:</strong> ${Math.round(state.toppings.cheese.totalWeight)}g`;
      
      updatePrintView();
    } catch (error) {
      console.error('Error in cheese calculation:', error);
    }
  }
  
  // Meat Topping Calculator
  function initMeatCalculator() {
    domElements.meatServings.addEventListener('input', debounce(calculateMeat));
    document.querySelectorAll('#meat-ingredients-table input').forEach(input => {
      input.addEventListener('input', debounce(calculateMeat));
    });
    document.querySelectorAll('#meat-ingredients-table .remove-item-button').forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        if (row && row.parentNode && !row.classList.contains('total-row')) {
          row.parentNode.removeChild(row);
          calculateMeat();
        }
      });
    });
    domElements.addMeatIngredient.addEventListener('click', function() {
      domElements.meatIngredientForm.style.display = 'block';
      domElements.meatIngredientName.focus();
    });
    domElements.saveMeatIngredient.addEventListener('click', function() {
      const name = domElements.meatIngredientName.value.trim();
      const amount = parseFloat(domElements.meatIngredientAmount.value) || 0;
      const price = parseFloat(domElements.meatIngredientPrice.value) || 0;
      if (name && amount > 0) {
        addMeatIngredientRow(name, amount, price);
        resetMeatIngredientForm();
        calculateMeat();
      }
    });
    domElements.cancelMeatIngredient.addEventListener('click', function() {
      resetMeatIngredientForm();
    });
    calculateMeat();
  }

  function resetMeatIngredientForm() {
    domElements.meatIngredientForm.style.display = 'none';
    domElements.meatIngredientName.value = '';
    domElements.meatIngredientAmount.value = '';
    domElements.meatIngredientPrice.value = '';
  }

  function addMeatIngredientRow(name, amount, price) {
    const tbody = document.querySelector('#meat-ingredients-table tbody');
    const totalRow = tbody.querySelector('.total-row');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${name}</td>
      <td><input type="number" class="meat-ingredient-amount" value="${amount}" min="0"></td>
      <td class="meat-total-amount">0g</td>
      <td class="price-column"><input type="number" class="price-input" value="${price}" min="0" step="0.1"></td>
      <td class="price-column price-display">$0.00</td>
      <td><button class="remove-item-button"><i class="fa fa-trash"></i></button></td>
    `;
    newRow.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', debounce(calculateMeat));
    });
    newRow.querySelector('.remove-item-button').addEventListener('click', function() {
      tbody.removeChild(newRow);
      calculateMeat();
    });
    tbody.insertBefore(newRow, totalRow);
  }

  function calculateMeat() {
    try {
      state.toppings.meat.ingredients = [];
      state.toppings.meat.totalWeight = 0;
      state.toppings.meat.totalCost = 0;
      
      // Use fixed perPiece value since we removed the input field
      const perPiece = 50; // Default: 50g per piece
      state.toppings.meat.perPiece = perPiece;
      
      const servings = parseInt(domElements.meatServings.value) || 0;
      state.toppings.meat.servings = servings;
      
      const totalNeeded = servings * perPiece;
      
      const ingredientRows = document.querySelectorAll('#meat-ingredients-table tbody tr:not(.total-row)');
      ingredientRows.forEach(row => {
        const nameCell = row.cells[0].textContent;
        const amountInput = row.querySelector('.meat-ingredient-amount');
        const totalAmountCell = row.querySelector('.meat-total-amount');
        const priceInput = row.querySelector('.price-input');
        const priceDisplay = row.querySelector('.price-display');
        
        const amount = parseFloat(amountInput.value) || 0;
        const totalAmount = amount * servings;
        
        // Update total amount cell
        if (totalAmountCell) totalAmountCell.textContent = totalAmount + 'g';
        
        const pricePerKg = parseFloat(priceInput.value) || 0;
        const cost = (totalAmount / 1000) * pricePerKg;
        updatePriceDisplay(priceDisplay, cost);
        
        state.toppings.meat.totalWeight += totalAmount;
        state.toppings.meat.totalCost += cost;
        
        state.toppings.meat.ingredients.push({
          name: nameCell,
          amount: amount,
          totalAmount: totalAmount,
          pricePerKg: pricePerKg,
          cost: cost
        });
      });
      
      // Update UI
      domElements.meatMixWeight.textContent = `${Math.round(state.toppings.meat.totalWeight)}g`;
      
      // Update the total column in the total row
      const totalRow = document.querySelector('#meat-ingredients-table tbody tr.total-row');
      if (totalRow) {
        const totalAmountCell = totalRow.querySelector('td:nth-child(3)');
        if (totalAmountCell) totalAmountCell.textContent = `${Math.round(state.toppings.meat.totalWeight)}g`;
      }
      
      updatePriceDisplay(domElements.meatMixCost, state.toppings.meat.totalCost);
      domElements.meatResult.innerHTML = `<strong>Total meat mix needed:</strong> ${Math.round(totalNeeded)}g`;
      
      updatePrintView();
    } catch (error) {
      console.error('Error in meat calculation:', error);
    }
  }
  
  // Banana Topping Calculator
  function initBananaCalculator() {
    domElements.bananaServings.addEventListener('input', debounce(calculateBanana));
    document.querySelectorAll('#banana-ingredients-table input').forEach(input => {
      input.addEventListener('input', debounce(calculateBanana));
    });
    document.querySelectorAll('#banana-ingredients-table .remove-item-button').forEach(button => {
      button.addEventListener('click', function() {
        const row = this.closest('tr');
        if (row && row.parentNode && !row.classList.contains('total-row')) {
          row.parentNode.removeChild(row);
          calculateBanana();
        }
      });
    });
    domElements.addBananaIngredient.addEventListener('click', function() {
      domElements.bananaIngredientForm.style.display = 'block';
      domElements.bananaIngredientName.focus();
    });
    domElements.saveBananaIngredient.addEventListener('click', function() {
      const name = domElements.bananaIngredientName.value.trim();
      const amount = parseFloat(domElements.bananaIngredientAmount.value) || 0;
      const price = parseFloat(domElements.bananaIngredientPrice.value) || 0;
      if (name && amount > 0) {
        addBananaIngredientRow(name, amount, price);
        resetBananaIngredientForm();
        calculateBanana();
      }
    });
    domElements.cancelBananaIngredient.addEventListener('click', function() {
      resetBananaIngredientForm();
    });
    calculateBanana();
  }

  function resetBananaIngredientForm() {
    domElements.bananaIngredientForm.style.display = 'none';
    domElements.bananaIngredientName.value = '';
    domElements.bananaIngredientAmount.value = '';
    domElements.bananaIngredientPrice.value = '';
  }

  function addBananaIngredientRow(name, amount, price) {
    const tbody = document.querySelector('#banana-ingredients-table tbody');
    const totalRow = tbody.querySelector('.total-row');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${name}</td>
      <td><input type="number" class="banana-ingredient-amount" value="${amount}" min="0"></td>
      <td class="banana-total-amount">0g</td>
      <td class="price-column"><input type="number" class="price-input" value="${price}" min="0" step="0.1"></td>
      <td class="price-column price-display">$0.00</td>
      <td><button class="remove-item-button"><i class="fa fa-trash"></i></button></td>
    `;
    newRow.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', debounce(calculateBanana));
    });
    newRow.querySelector('.remove-item-button').addEventListener('click', function() {
      tbody.removeChild(newRow);
      calculateBanana();
    });
    tbody.insertBefore(newRow, totalRow);
  }

  function calculateBanana() {
    try {
      state.toppings.banana.ingredients = [];
      state.toppings.banana.totalWeight = 0;
      state.toppings.banana.totalCost = 0;
      
      // Use fixed perPiece value since we removed the input field
      const perPiece = 50; // Default: 50g per piece
      state.toppings.banana.perPiece = perPiece;
      
      const servings = parseInt(domElements.bananaServings.value) || 0;
      state.toppings.banana.servings = servings;
      
      const totalNeeded = servings * perPiece;
      
      const ingredientRows = document.querySelectorAll('#banana-ingredients-table tbody tr:not(.total-row)');
      ingredientRows.forEach(row => {
        const nameCell = row.cells[0].textContent;
        const amountInput = row.querySelector('.banana-ingredient-amount');
        const totalAmountCell = row.querySelector('.banana-total-amount');
        const priceInput = row.querySelector('.price-input');
        const priceDisplay = row.querySelector('.price-display');
        
        const amount = parseFloat(amountInput.value) || 0;
        const totalAmount = amount * servings;
        
        // Update total amount cell
        if (totalAmountCell) totalAmountCell.textContent = totalAmount + 'g';
        
        const pricePerKg = parseFloat(priceInput.value) || 0;
        const cost = (totalAmount / 1000) * pricePerKg;
        updatePriceDisplay(priceDisplay, cost);
        
        state.toppings.banana.totalWeight += totalAmount;
        state.toppings.banana.totalCost += cost;
        
        state.toppings.banana.ingredients.push({
          name: nameCell,
          amount: amount,
          totalAmount: totalAmount,
          pricePerKg: pricePerKg,
          cost: cost
        });
      });
      
      // Update UI
      domElements.bananaMixWeight.textContent = `${Math.round(state.toppings.banana.totalWeight)}g`;
      
      // Update the total column in the total row
      const totalRow = document.querySelector('#banana-ingredients-table tbody tr.total-row');
      if (totalRow) {
        const totalAmountCell = totalRow.querySelector('td:nth-child(3)');
        if (totalAmountCell) totalAmountCell.textContent = `${Math.round(state.toppings.banana.totalWeight)}g`;
      }
      
      updatePriceDisplay(domElements.bananaMixCost, state.toppings.banana.totalCost);
      domElements.bananaResult.innerHTML = `<strong>Total chocolate-banana mix needed:</strong> ${Math.round(totalNeeded)}g`;
      
      updatePrintView();
    } catch (error) {
      console.error('Error in banana calculation:', error);
    }
  }
  
  function calculateAllToppings() {
    calculateZaatar();
    calculateCheese();
    calculateMeat();
    calculateBanana();
  }
  
  // Add this debounced version of updateSummary
  const debouncedUpdateSummary = debounce(function() {
    // Only update if the summary tab is active
    if (state.activeTab !== 'summary') return;
    
    try {
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
            // Update sections one by one
            updateProductionSummary();
            requestAnimationFrame(() => {
                updateDoughSummary();
                requestAnimationFrame(() => {
                    updateToppingsSummary();
                    requestAnimationFrame(() => {
                        updateCostSummary();
                        // Update print view after all calculations are done
                        requestAnimationFrame(() => {
                            updatePrintView();
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error in summary calculation:', error);
    }
}, 100);

  // Keep the original updateSummary as a simple wrapper for the debounced version
  function updateSummary() {
    debouncedUpdateSummary();
  }
  
  // Summary Tab Functions
  function updateProductionSummary() {
    const tbody = domElements.summaryProduction;
    tbody.innerHTML = '';
    
    // Get current currency
    const currency = domElements.globalCurrencySelector.value || 'GBP';
    
    // Calculate dough cost
    const totalBatchWeight = state.doughRecipe.batch.numBalls * state.doughRecipe.batch.ballWeight;
    const scalingFactor = state.doughRecipe.totalWeight > 0 ? totalBatchWeight / state.doughRecipe.totalWeight : 1;
    const scaledDoughCost = state.doughRecipe.totalCost * scalingFactor;
    const doughCostPerBall = state.doughRecipe.batch.numBalls > 0 ? 
        scaledDoughCost / state.doughRecipe.batch.numBalls : 0;
    
    // Calculate all toppings cost
    let totalToppingsCost = 0;
    
    // Add standard toppings
    totalToppingsCost += state.toppings.zaatar.totalCost || 0;
    totalToppingsCost += state.toppings.cheese.totalCost || 0;
    totalToppingsCost += state.toppings.meat.totalCost || 0;
    totalToppingsCost += state.toppings.banana.totalCost || 0;
    
    // Add custom toppings
    Object.keys(state.customToppings || {}).forEach(id => {
      totalToppingsCost += state.customToppings[id].totalCost || 0;
    });
    
    // Calculate total project cost
    const totalProjectCost = scaledDoughCost + totalToppingsCost;
    
    const doughRow = document.createElement('tr');
    doughRow.innerHTML = `
      <td>Dough</td>
      <td>${state.doughRecipe.batch.numBalls} pieces</td>
      <td class="price-column">${formatPrice(doughCostPerBall, currency)}</td>
      <td class="price-column">${formatPrice(scaledDoughCost, currency)}</td>
    `;
    tbody.appendChild(doughRow);
    
    // Add toppings rows
    if (state.toppings.zaatar.servings > 0) {
      const zaatarCostPerServing = state.toppings.zaatar.totalCost / state.toppings.zaatar.servings;
      const zaatarRow = document.createElement('tr');
      zaatarRow.innerHTML = `
        <td>Za'atar Topping</td>
        <td>${state.toppings.zaatar.servings} pieces</td>
        <td class="price-column">${formatPrice(zaatarCostPerServing, currency)}</td>
        <td class="price-column">${formatPrice(state.toppings.zaatar.totalCost, currency)}</td>
      `;
      tbody.appendChild(zaatarRow);
    }
    
    if (state.toppings.cheese.servings > 0) {
      const cheeseCostPerServing = state.toppings.cheese.totalCost / state.toppings.cheese.servings;
      const cheeseRow = document.createElement('tr');
      cheeseRow.innerHTML = `
        <td>Cheese Topping</td>
        <td>${state.toppings.cheese.servings} pieces</td>
        <td class="price-column">${formatPrice(cheeseCostPerServing, currency)}</td>
        <td class="price-column">${formatPrice(state.toppings.cheese.totalCost, currency)}</td>
      `;
      tbody.appendChild(cheeseRow);
    }
    
    if (state.toppings.meat.servings > 0) {
      const meatCostPerServing = state.toppings.meat.totalCost / state.toppings.meat.servings;
      const meatRow = document.createElement('tr');
      meatRow.innerHTML = `
        <td>Meat Topping</td>
        <td>${state.toppings.meat.servings} pieces</td>
        <td class="price-column">${formatPrice(meatCostPerServing, currency)}</td>
        <td class="price-column">${formatPrice(state.toppings.meat.totalCost, currency)}</td>
      `;
      tbody.appendChild(meatRow);
    }
    
    if (state.toppings.banana.servings > 0) {
      const bananaCostPerServing = state.toppings.banana.totalCost / state.toppings.banana.servings;
      const bananaRow = document.createElement('tr');
      bananaRow.innerHTML = `
        <td>Chocolate-Banana Topping</td>
        <td>${state.toppings.banana.servings} pieces</td>
        <td class="price-column">${formatPrice(bananaCostPerServing, currency)}</td>
        <td class="price-column">${formatPrice(state.toppings.banana.totalCost, currency)}</td>
      `;
      tbody.appendChild(bananaRow);
    }
    
    // Add custom toppings
    Object.keys(state.customToppings || {}).forEach(id => {
      const topping = state.customToppings[id];
      if (topping.servings > 0) {
        const costPerServing = topping.totalCost / topping.servings;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${topping.name} Topping</td>
          <td>${topping.servings} pieces</td>
          <td class="price-column">${formatPrice(costPerServing, currency)}</td>
          <td class="price-column">${formatPrice(topping.totalCost, currency)}</td>
        `;
        tbody.appendChild(row);
      }
    });
    
    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    totalRow.innerHTML = `
      <td>Total Project Cost</td>
      <td></td>
      <td></td>
      <td class="price-column">${formatPrice(totalProjectCost, currency)}</td>
    `;
    tbody.appendChild(totalRow);
  }
  
  // Print and Share Functions
  function initShareAndPrint() {
    // Share recipe button
    domElements.shareRecipe.addEventListener('click', function() {
      const shareUrl = generateShareUrl();
      domElements.shareUrl.value = shareUrl;
      domElements.shareModal.style.display = 'block';
    });
    
    // Copy share URL button
    domElements.copyShareUrl.addEventListener('click', function() {
      copyToClipboard(domElements.shareUrl.value);
      showToast('Share link copied to clipboard!');
      domElements.shareModal.style.display = 'none';
    });
    
    // Copy recipe button
    domElements.copyRecipe.addEventListener('click', function() {
      const recipeText = generateRecipeText();
      copyToClipboard(recipeText);
      showToast('Recipe copied to clipboard!');
    });
    
    // Print recipe button
    domElements.printRecipe.addEventListener('click', function() {
      updatePrintView();
      window.print();
    });
    
    // Share toppings button
    domElements.shareToppings.addEventListener('click', function() {
      const shareUrl = generateToppingsShareUrl();
      domElements.shareToppingsUrl.value = shareUrl;
      domElements.shareToppingsModal.style.display = 'block';
    });
    
    // Copy toppings share URL button
    domElements.copyToppingsShareUrl.addEventListener('click', function() {
      copyToClipboard(domElements.shareToppingsUrl.value);
      showToast('Share link copied to clipboard!');
      domElements.shareToppingsModal.style.display = 'none';
    });
    
    // Copy toppings button
    domElements.copyToppings.addEventListener('click', function() {
      const toppingsText = generateToppingsText();
      copyToClipboard(toppingsText);
      showToast('Toppings recipes copied to clipboard!');
    });
    
    // Print toppings button
    domElements.printToppings.addEventListener('click', function() {
      updatePrintView();
      window.print();
    });
    
    // Print BOQ button
    domElements.printBOQ.addEventListener('click', function() {
      updatePrintView();
      window.print();
    });
    
    // Close modal buttons
    domElements.closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
          modal.style.display = 'none';
        }
      });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    });
    
    // Load from URL hash if present
    loadFromUrl();
  }
  
  function generateShareUrl() {
    try {
      // Create data object
      const data = {
        dough: {
          ingredients: state.doughRecipe.ingredients.map(ingredient => ({
            name: ingredient.name,
            weight: ingredient.weight,
            price: ingredient.pricePerKg
          })),
          batch: state.doughRecipe.batch
        }
      };
      
      // Compress data
      const jsonStr = JSON.stringify(data);
      const compressed = LZString.compressToEncodedURIComponent(jsonStr);
      
      // Generate URL
      const baseUrl = window.location.href.split('#')[0];
      return `${baseUrl}#dough?data=${compressed}`;
    } catch (error) {
      console.error('Error generating share URL:', error);
      return window.location.href;
    }
  }
  
  function generateToppingsShareUrl() {
    try {
      // Create data object
      const data = {
        toppings: {
          zaatar: {
            servings: state.toppings.zaatar.servings,
            perPiece: state.toppings.zaatar.perPiece,
            ingredients: state.toppings.zaatar.ingredients.map(ingredient => ({
              name: ingredient.name,
              amount: ingredient.amount,
              price: ingredient.pricePerKg
            }))
          },
          cheese: {
            servings: state.toppings.cheese.servings,
            perPiece: state.toppings.cheese.perPiece,
            cheeseTypes: state.toppings.cheese.cheeseTypes.map(cheese => ({
              name: cheese.name,
              percent: cheese.percent,
              price: cheese.pricePerKg
            }))
          },
          meat: {
            servings: state.toppings.meat.servings,
            perPiece: state.toppings.meat.perPiece,
            ingredients: state.toppings.meat.ingredients.map(ingredient => ({
              name: ingredient.name,
              amount: ingredient.amount,
              price: ingredient.pricePerKg
            }))
          },
          banana: {
            servings: state.toppings.banana.servings,
            perPiece: state.toppings.banana.perPiece,
            ingredients: state.toppings.banana.ingredients.map(ingredient => ({
              name: ingredient.name,
              amount: ingredient.amount,
              price: ingredient.pricePerKg
            }))
          }
        }
      };
      
      // Compress data
      const jsonStr = JSON.stringify(data);
      const compressed = LZString.compressToEncodedURIComponent(jsonStr);
      
      // Generate URL
      const baseUrl = window.location.href.split('#')[0];
      return `${baseUrl}#toppings?data=${compressed}`;
    } catch (error) {
      console.error('Error generating toppings share URL:', error);
      return window.location.href;
    }
  }
  
  function loadFromUrl() {
    try {
      // Check if URL has data parameter
      const hash = window.location.hash;
      if (!hash || hash.indexOf('?data=') === -1) return;
      
      // Extract compressed data
      const compressed = hash.split('?data=')[1];
      if (!compressed) return;
      
      // Decompress data
      const jsonStr = LZString.decompressFromEncodedURIComponent(compressed);
      if (!jsonStr) return;
      
      const data = JSON.parse(jsonStr);
      
      // Load dough data
      if (data.dough) {
        // Clear existing ingredients
        const tbody = domElements.doughIngredientsTable.querySelector('tbody');
        const totalRow = tbody.querySelector('.total-row');
        
        // Remove all rows except total row
        while (tbody.firstChild && !tbody.firstChild.classList.contains('total-row')) {
          tbody.removeChild(tbody.firstChild);
        }
        
        // Add imported ingredients
        data.dough.ingredients.forEach(ingredient => {
          addDoughIngredientRow(ingredient.name, ingredient.weight, ingredient.price);
        });
        
        // Set batch values
        if (data.dough.batch) {
          domElements.doughBalls.value = data.dough.batch.numBalls;
          domElements.ballWeight.value = data.dough.batch.ballWeight;
        }
        
        // Recalculate dough
        calculateDough();
      }
      
      // Load toppings data
      if (data.toppings) {
        // Load Za'atar data
        if (data.toppings.zaatar) {
          // Set serving values
          domElements.zaatarServings.value = data.toppings.zaatar.servings;
          domElements.zaatarPerPiece.value = data.toppings.zaatar.perPiece;
          
          // Clear existing ingredients
          const tbody = document.querySelector('#zaatar-ingredients-table tbody');
          const totalRow = tbody.querySelector('.total-row');
          
          // Remove all rows except total row
          while (tbody.firstChild && !tbody.firstChild.classList.contains('total-row')) {
            tbody.removeChild(tbody.firstChild);
          }
          
          // Add imported ingredients
          data.toppings.zaatar.ingredients.forEach(ingredient => {
            addZaatarIngredientRow(ingredient.name, ingredient.amount, ingredient.price);
          });
          
          // Recalculate za'atar
          calculateZaatar();
        }
        
        // Load Cheese data
        if (data.toppings.cheese) {
          // Set serving values
          domElements.cheeseServings.value = data.toppings.cheese.servings;
          domElements.cheesePerPiece.value = data.toppings.cheese.perPiece;
          
          // Clear existing cheese types
          const tbody = document.querySelector('#cheese-ingredients-table tbody');
          const totalRow = tbody.querySelector('.total-row');
          
          // Remove all rows except total row
          while (tbody.firstChild && !tbody.firstChild.classList.contains('total-row')) {
            tbody.removeChild(tbody.firstChild);
          }
          
          // Add imported cheese types
          data.toppings.cheese.cheeseTypes.forEach(cheese => {
            addCheeseIngredientRow(cheese.name, cheese.amount, cheese.price);
          });
          
          // Recalculate cheese
          calculateCheese();
        }
        
        // Load Meat data
        if (data.toppings.meat) {
          // Set serving values
          domElements.meatServings.value = data.toppings.meat.servings;
          domElements.meatPerPiece.value = data.toppings.meat.perPiece;
          
          // Clear existing ingredients
          const tbody = document.querySelector('#meat-ingredients-table tbody');
          const totalRow = tbody.querySelector('.total-row');
          
          // Remove all rows except total row
          while (tbody.firstChild && !tbody.firstChild.classList.contains('total-row')) {
            tbody.removeChild(tbody.firstChild);
          }
          
          // Add imported ingredients
          data.toppings.meat.ingredients.forEach(ingredient => {
            addMeatIngredientRow(ingredient.name, ingredient.amount, ingredient.price);
          });
          
          // Recalculate meat
          calculateMeat();
        }
        
        // Load Banana data
        if (data.toppings.banana) {
          // Set serving values
          domElements.bananaServings.value = data.toppings.banana.servings;
          domElements.bananaPerPiece.value = data.toppings.banana.perPiece;
          
          // Clear existing ingredients
          const tbody = document.querySelector('#banana-ingredients-table tbody');
          const totalRow = tbody.querySelector('.total-row');
          
          // Remove all rows except total row
          while (tbody.firstChild && !tbody.firstChild.classList.contains('total-row')) {
            tbody.removeChild(tbody.firstChild);
          }
          
          // Add imported ingredients
          data.toppings.banana.ingredients.forEach(ingredient => {
            addBananaIngredientRow(ingredient.name, ingredient.amount, ingredient.price);
          });
          
          // Recalculate banana
          calculateBanana();
        }
      }
    } catch (error) {
      console.error('Error loading from URL:', error);
    }
  }
  
  function generateRecipeText() {
    let text = `MANAKISH DOUGH RECIPE\n`;
    text += `=====================\n\n`;
    
    // Add dough ingredients
    text += `Ingredients:\n`;
    state.doughRecipe.ingredients.forEach(ingredient => {
      text += `${ingredient.name}: ${Math.round(ingredient.weight)}g\n`;
    });
    
    text += `\nTotal Dough Weight: ${Math.round(state.doughRecipe.totalWeight)}g\n\n`;
    
    // Add batch information
    const numBalls = state.doughRecipe.batch.numBalls;
    const ballWeight = state.doughRecipe.batch.ballWeight;
    text += `Makes ${numBalls} dough balls of ${ballWeight}g each.\n\n`;
    
    // Add baker's percentages
    text += `Baker's Percentages:\n`;
    text += `Hydration: ${Math.round(state.doughRecipe.analysis.hydration)}%\n`;
    text += `Salt: ${state.doughRecipe.analysis.salt.toFixed(1)}%\n`;
    text += `Oil: ${state.doughRecipe.analysis.oil.toFixed(1)}%\n`;
    text += `Yeast: ${state.doughRecipe.analysis.yeast.toFixed(2)}%\n`;
    
    if (state.doughRecipe.analysis.sugar > 0) {
      text += `Sugar: ${state.doughRecipe.analysis.sugar.toFixed(1)}%\n`;
    }
    
    return text;
  }
  
  function generateToppingsText() {
    let text = `MANAKISH TOPPINGS RECIPES\n`;
    text += `========================\n\n`;
    
    // Add Za'atar topping
    if (state.toppings.zaatar.servings > 0) {
      text += `ZA'ATAR TOPPING\n`;
      text += `--------------\n`;
      text += `Makes enough for ${state.toppings.zaatar.servings} manakish, ${state.toppings.zaatar.perPiece}g each.\n\n`;
      
      text += `Ingredients:\n`;
      state.toppings.zaatar.ingredients.forEach(ingredient => {
        text += `${ingredient.name}: ${Math.round(ingredient.amount)}g\n`;
      });
      
      text += `\nTotal Mix: ${Math.round(state.toppings.zaatar.totalWeight)}g\n\n`;
    }
    
    // Add Cheese topping
    if (state.toppings.cheese.servings > 0) {
      text += `CHEESE TOPPING\n`;
      text += `--------------\n`;
      text += `Makes enough for ${state.toppings.cheese.servings} manakish, ${state.toppings.cheese.perPiece}g each.\n\n`;
      
      text += `Cheese Mix:\n`;
      state.toppings.cheese.cheeseTypes.forEach(cheese => {
        text += `${cheese.name}: ${cheese.percent}%\n`;
      });
      
      const totalNeeded = state.toppings.cheese.servings * state.toppings.cheese.perPiece;
      text += `\nTotal cheese needed: ${totalNeeded}g\n\n`;
    }
    
    // Add Meat topping
    if (state.toppings.meat.servings > 0) {
      text += `MEAT TOPPING (LAHM BI AJEEN)\n`;
      text += `---------------------------\n`;
      text += `Makes enough for ${state.toppings.meat.servings} manakish, ${state.toppings.meat.perPiece}g each.\n\n`;
      
      text += `Ingredients:\n`;
      state.toppings.meat.ingredients.forEach(ingredient => {
        text += `${ingredient.name}: ${Math.round(ingredient.amount)}g\n`;
      });
      
      text += `\nTotal Mix: ${Math.round(state.toppings.meat.totalWeight)}g\n\n`;
    }
    
    // Add Banana topping
    if (state.toppings.banana.servings > 0) {
      text += `CHOCOLATE BANANA TOPPING\n`;
      text += `-----------------------\n`;
      text += `Makes enough for ${state.toppings.banana.servings} manakish, ${state.toppings.banana.perPiece}g each.\n\n`;
      
      text += `Ingredients:\n`;
      state.toppings.banana.ingredients.forEach(ingredient => {
        text += `${ingredient.name}: ${Math.round(ingredient.amount)}g\n`;
      });
      
      text += `\nTotal Mix: ${Math.round(state.toppings.banana.totalWeight)}g\n\n`;
    }
    
    return text;
  }
  
  function updatePrintView() {
    try {
      const currency = domElements.currencySelector.value;
      
      // Update dough ingredients
      const doughTable = domElements.printDoughTable;
      doughTable.innerHTML = '';
      
      state.doughRecipe.ingredients.forEach(ingredient => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${ingredient.name}</td>
          <td>${ingredient.weight}g</td>
          <td>${formatPrice(ingredient.pricePerKg, currency)}/kg</td>
          <td>${formatPrice(ingredient.cost, currency)}</td>
        `;
        doughTable.appendChild(row);
      });
      
      // Add total row
      const totalRow = document.createElement('tr');
      totalRow.className = 'total-row';
      totalRow.innerHTML = `
        <td>Total</td>
        <td>${Math.round(state.doughRecipe.totalWeight)}g</td>
        <td></td>
        <td>${formatPrice(state.doughRecipe.totalCost, currency)}</td>
      `;
      doughTable.appendChild(totalRow);
      
      // Update recipe analysis
      if (state.doughRecipe.analysis) {
        domElements.printDoughDetails.innerHTML = `
          <p>Hydration: ${Math.round(state.doughRecipe.analysis.hydration)}%</p>
          <p>Salt: ${state.doughRecipe.analysis.salt.toFixed(1)}%</p>
          <p>Oil: ${state.doughRecipe.analysis.oil.toFixed(1)}%</p>
          <p>Yeast: ${state.doughRecipe.analysis.yeast.toFixed(1)}%</p>
          <p>Sugar: ${state.doughRecipe.analysis.sugar.toFixed(1)}%</p>
        `;
      }
      
      // Update batch information
      if (state.batchInfo) {
        domElements.printBatchDetails.innerHTML = `
          <p>Number of Dough Balls: ${state.batchInfo.balls}</p>
          <p>Weight per Ball: ${state.batchInfo.ballWeight}g</p>
          <p>Total Batch Weight: ${state.batchInfo.totalWeight}g</p>
          <p>Total Batch Cost: ${formatPrice(state.batchInfo.totalCost, currency)}</p>
        `;
      }
      
      // Update date
      const now = new Date();
      domElements.printDate.textContent = now.toLocaleDateString();
    } catch (error) {
      console.error('Error updating print view:', error);
    }
  }
  
  function copyToClipboard(text) {
    try {
      // Create temporary element
      const element = document.createElement('textarea');
      element.value = text;
      document.body.appendChild(element);
      
      // Select and copy
      element.select();
      document.execCommand('copy');
      
      // Remove temporary element
      document.body.removeChild(element);
      
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  }
  
  function showToast(message) {
    // Set message
    domElements.copyMessage.textContent = message;
    
    // Show toast
    domElements.copyConfirmation.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
      domElements.copyConfirmation.classList.remove('show');
    }, 3000);
  }
  
  // Initialize all calculators
  function init() {
    initTabs();
    initPriceToggles();
    initDoughCalculator();
    initMenuItems();
    initZaatarCalculator();
    initCheeseCalculator();
    initMeatCalculator();
    initBananaCalculator();
    initShareAndPrint();
  }
  
  // Menu Items Management
  function initMenuItems() {
    // Move existing sections into the container
    moveExistingSectionsToContainer();
    
    // Add Event Listeners
    document.getElementById('addMenuItemBtn').addEventListener('click', showAddMenuItemForm);
    document.getElementById('saveMenuItem').addEventListener('click', saveMenuItem);
    document.getElementById('cancelMenuItem').addEventListener('click', hideAddMenuItemForm);
    
    // Add event listeners to all remove buttons
    document.querySelectorAll('.remove-menu-item-button').forEach(button => {
      button.addEventListener('click', removeMenuItem);
    });
    
    // Add event listeners to all edit buttons
    document.querySelectorAll('.edit-menu-item-button').forEach(button => {
      button.addEventListener('click', showEditMenuItemForm);
    });
    
    // Add event listeners to all save edit buttons
    document.querySelectorAll('.save-edit-button').forEach(button => {
      button.addEventListener('click', function() {
        const section = this.closest('.menu-item-section');
        const id = section.getAttribute('data-menu-item');
        saveEditMenuItem(this, id);
      });
    });
    
    // Add event listeners to all cancel edit buttons
    document.querySelectorAll('.cancel-edit-button').forEach(button => {
      button.addEventListener('click', function() {
        hideEditMenuItemForm(this);
      });
    });
    
    // Set up the icon selector radio buttons to update the hidden select
    document.querySelectorAll('.icon-option').forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.checked) {
          // For add form
          if (this.name === 'menuIcon') {
            document.getElementById('menuItemIcon').value = this.value;
          } 
          // For edit forms
          else {
            const section = this.closest('.menu-item-section');
            const selectElement = section.querySelector('.edit-menu-item-icon');
            selectElement.value = this.value;
          }
        }
      });
    });
    
    // Initially set the correct icons as selected based on existing menu items
    initializeIconSelectors();
  }

  // Add this function to initialize the visual icon selectors for existing menu items
  function initializeIconSelectors() {
    document.querySelectorAll('.menu-item-section').forEach(section => {
      const id = section.getAttribute('data-menu-item');
      const iconElement = section.querySelector('.section-title i');
      const iconClass = iconElement.className;
      
      // Find the matching radio button and select it
      const radios = section.querySelectorAll('.icon-option');
      radios.forEach(radio => {
        if (radio.value === iconClass) {
          radio.checked = true;
        }
      });
      
      // Update the hidden select
      const selectElement = section.querySelector('.edit-menu-item-icon');
      if (selectElement) {
        selectElement.value = iconClass;
      }
    });
  }

  function saveMenuItem() {
    const name = document.getElementById('menuItemName').value.trim();
    
    // Get the selected icon from the radio buttons
    let iconClass = document.getElementById('menuItemIcon').value; // Default to the hidden field value
    const selectedRadio = document.querySelector('input[name="menuIcon"]:checked');
    if (selectedRadio) {
      iconClass = selectedRadio.value;
    }
    
    if (!name) {
      alert('Please enter a name for the menu item');
      return;
    }
    
    // Create a unique ID for the new menu item
    const menuItemId = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Check if it already exists
    if (document.querySelector(`[data-menu-item="${menuItemId}"]`)) {
      alert('A menu item with this name already exists');
      return;
    }
    
    // Create the new menu item
    createNewMenuItem(menuItemId, name, iconClass);
    
    // Hide the form
    hideAddMenuItemForm();
  }
  
  // Add this function to show the edit form
  function showEditMenuItemForm(event) {
    const section = event.currentTarget.closest('.menu-item-section');
    const editForm = section.querySelector('.edit-menu-item-form');
    
    // Set the current icon in the form
    const currentIcon = section.querySelector('.section-title i').className;
    const radioButtons = section.querySelectorAll('.icon-option');
    radioButtons.forEach(radio => {
      if (radio.value === currentIcon) {
        radio.checked = true;
      }
    });
    
    editForm.style.display = 'block';
  }

  // Add this function to save the edit
  function saveEditMenuItem(buttonElement, id) {
    const section = buttonElement.closest('.menu-item-section');
    const nameInput = section.querySelector('.edit-menu-item-name');
    
    // Get the selected icon from the radio buttons
    let newIcon = '';
    const radioButtons = section.querySelectorAll('.icon-option');
    radioButtons.forEach(radio => {
      if (radio.checked) {
        newIcon = radio.value;
      }
    });
    
    // If no radio button is checked, use the value from the hidden select
    if (!newIcon) {
      const selectElement = section.querySelector('.edit-menu-item-icon');
      newIcon = selectElement.value;
    }
    
    const newName = nameInput.value.trim();
    
    if (!newName) {
      alert('Please enter a name for the menu item');
      return;
    }
    
    // Update the title
    const titleElement = section.querySelector('.section-title');
    titleElement.innerHTML = `<i class="${newIcon}"></i> ${newName} Topping`;
    
    // Update the ingredients heading
    const ingredientsHeading = section.querySelector('.topping-card h4');
    ingredientsHeading.textContent = `${newName} Mix Ingredients`;
    
    // Hide the edit form
    hideEditMenuItemForm(buttonElement);
    
    // Update state and recalculate if needed
    calculateCustomIngredients(id);
  }

  function createNewMenuItem(id, name, iconClass) {
    const container = document.getElementById('menu-items-container');
    
    // Create the new section
    const section = document.createElement('div');
    section.className = 'calculator-section menu-item-section';
    section.setAttribute('data-menu-item', id);
    
    // Create the section HTML with the visual icon selector
    section.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">
          <i class="${iconClass}"></i> ${name} Topping
        </h2>
        <div class="section-header-buttons">
          <button class="edit-menu-item-button"><i class="fa fa-pen"></i></button>
          <button class="remove-menu-item-button"><i class="fa fa-trash"></i></button>
        </div>
      </div>
      
      <div class="edit-menu-item-form">
        <div class="form-row">
          <div class="form-group">
            <label>Select Icon</label>
            <div class="icon-selector-container">
              <input type="radio" name="${id}Icon" id="${id}-icon-cheese" class="icon-option" value="fas fa-cheese">
              <label for="${id}-icon-cheese"><i class="fas fa-cheese"></i></label>
              
              <input type="radio" name="${id}Icon" id="${id}-icon-meat" class="icon-option" value="fas fa-drumstick-bite">
              <label for="${id}-icon-meat"><i class="fas fa-drumstick-bite"></i></label>
              
              <input type="radio" name="${id}Icon" id="${id}-icon-sweet" class="icon-option" value="fas fa-cookie">
              <label for="${id}-icon-sweet"><i class="fas fa-cookie"></i></label>
              
              <input type="radio" name="${id}Icon" id="${id}-icon-vegetable" class="icon-option" value="fas fa-leaf">
              <label for="${id}-icon-vegetable"><i class="fas fa-leaf"></i></label>
              
              <input type="radio" name="${id}Icon" id="${id}-icon-pizza" class="icon-option" value="fas fa-pizza-slice">
              <label for="${id}-icon-pizza"><i class="fas fa-pizza-slice"></i></label>
              
              <input type="radio" name="${id}Icon" id="${id}-icon-bread" class="icon-option" value="fas fa-bread-slice">
              <label for="${id}-icon-bread"><i class="fas fa-bread-slice"></i></label>
              
              <input type="radio" name="${id}Icon" id="${id}-icon-spicy" class="icon-option" value="fas fa-pepper-hot">
              <label for="${id}-icon-spicy"><i class="fas fa-pepper-hot"></i></label>
              
              <input type="radio" name="${id}Icon" id="${id}-icon-herbs" class="icon-option" value="fas fa-seedling">
              <label for="${id}-icon-herbs"><i class="fas fa-seedling"></i></label>
              
              <input type="radio" name="${id}Icon" id="${id}-icon-breakfast" class="icon-option" value="fas fa-egg">
              <label for="${id}-icon-breakfast"><i class="fas fa-egg"></i></label>
              
              <input type="radio" name="${id}Icon" id="${id}-icon-fruit" class="icon-option" value="fas fa-apple-alt">
              <label for="${id}-icon-fruit"><i class="fas fa-apple-alt"></i></label>
            </div>
          </div>
          
          <div class="form-group">
            <label for="${id}-name">Menu Item Name</label>
            <input type="text" id="${id}-name" class="edit-menu-item-name" value="${name}" placeholder="Menu Item Name" />
          </div>
          
          <!-- Keep the hidden dropdown for compatibility with existing JS -->
          <select class="edit-menu-item-icon" style="display: none;">
            <option value="fas fa-cheese">Cheese</option>
            <option value="fas fa-drumstick-bite">Meat</option>
            <option value="fas fa-cookie">Sweet</option>
            <option value="fas fa-leaf">Vegetable</option>
            <option value="fas fa-pizza-slice">Pizza</option>
            <option value="fas fa-bread-slice">Bread</option>
            <option value="fas fa-pepper-hot">Spicy</option>
            <option value="fas fa-seedling">Herbs</option>
            <option value="fas fa-egg">Breakfast</option>
            <option value="fas fa-apple-alt">Fruit</option>
          </select>
        </div>
        <div class="form-row buttons-row">
          <button class="save-edit-button add-item-button">
            <i class="fas fa-save"></i> Save Changes
          </button>
          <button class="cancel-edit-button remove-item-button">
            <i class="fas fa-times"></i> Cancel
          </button>
        </div>
      </div>
      
      <div class="topping-card">
        <div class="controls">
          <div class="control-group">
            <label for="${id}Servings">Number of Manakish:</label>
            <input
              type="number"
              id="${id}Servings"
              value="8"
              min="1"
              max="100"
            />
          </div>
        </div>
        <hr class="dotted-divider" />
        <h4>${name} Mix Ingredients</h4>

        <div id="${id}-ingredients-container">
          <table id="${id}-ingredients-table">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Per Manakish (g)</th>
                <th>Total Amount (g)</th>
                <th class="price-column">Price/kg</th>
                <th class="price-column">Total Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="total-row">
                <td>Total</td>
                <td></td>
                <td class="${id}-total-amount" id="${id}MixWeight">0g</td>
                <td class="price-column"></td>
                <td class="price-column" id="${id}MixCost">$0.00</td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 10px">
            <button id="add${id.charAt(0).toUpperCase() + id.slice(1)}Ingredient" class="add-item-button">
              <i class="fas fa-plus"></i> Add Ingredient
            </button>
          </div>

          <div
            id="${id}IngredientForm"
            style="display: none; margin-top: 15px"
          >
            <div class="custom-ingredient-row">
              <input
                type="text"
                id="${id}IngredientName"
                class="custom-ingredient-name"
                placeholder="Ingredient Name"
              />
              <input
                type="number"
                id="${id}IngredientAmount"
                class="custom-ingredient-weight"
                placeholder="Amount (g)"
                min="0"
              />
              <input
                type="number"
                id="${id}IngredientPrice"
                class="custom-ingredient-price price-input"
                placeholder="Price/kg"
                min="0"
                step="0.1"
              />
              <button id="save${id.charAt(0).toUpperCase() + id.slice(1)}Ingredient" class="add-item-button">
                Add
              </button>
              <button
                id="cancel${id.charAt(0).toUpperCase() + id.slice(1)}Ingredient"
                class="remove-item-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div id="${id}Result" class="servings-info"></div>
      </div>
    `;
    
    // Add the section to the DOM
    container.appendChild(section);
    
    // Set the selected icon radio button
    const radioButton = section.querySelector(`.icon-option[value="${iconClass}"]`);
    if (radioButton) {
      radioButton.checked = true;
    }
    
    // Set the value in the hidden select
    const selectElement = section.querySelector('.edit-menu-item-icon');
    if (selectElement) {
      selectElement.value = iconClass;
    }
    
    // Add event listeners
    section.querySelector('.remove-menu-item-button').addEventListener('click', removeMenuItem);
    section.querySelector('.edit-menu-item-button').addEventListener('click', showEditMenuItemForm);
    section.querySelector('.save-edit-button').addEventListener('click', function() {
      saveEditMenuItem(this, id);
    });
    section.querySelector('.cancel-edit-button').addEventListener('click', function() {
      hideEditMenuItemForm(this);
    });
    
    // Add event listeners to the radio buttons
    section.querySelectorAll('.icon-option').forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.checked) {
          selectElement.value = this.value;
        }
      });
    });
    
    // Initialize calculator for this menu item
    initCustomIngredientCalculator(id, name);
  }

  function moveExistingSectionsToContainer() {
    const container = document.getElementById('menu-items-container');
    
    // Get the preset sections
    const zaatarSection = document.querySelector('[data-menu-item="zaatar"]');
    const cheeseSection = document.querySelector('[data-menu-item="cheese"]');
    const meatSection = document.querySelector('[data-menu-item="meat"]');
    const bananaSection = document.querySelector('[data-menu-item="banana"]');
    
    // If they exist in the original places, move them to the container
    if (zaatarSection && cheeseSection && meatSection && bananaSection) {
      container.appendChild(zaatarSection);
      container.appendChild(cheeseSection);
      container.appendChild(meatSection);
      container.appendChild(bananaSection);
    }
  }

  function showAddMenuItemForm() {
    document.getElementById('add-menu-item-form').style.display = 'block';
    document.getElementById('menuItemName').focus();
  }

  function hideAddMenuItemForm() {
    document.getElementById('add-menu-item-form').style.display = 'none';
    document.getElementById('menuItemName').value = '';
  }

  function removeMenuItem(event) {
    const section = event.currentTarget.closest('.menu-item-section');
    const menuItemId = section.getAttribute('data-menu-item');
    
    // Don't allow removing all menu items
    const remainingMenuItems = document.querySelectorAll('.menu-item-section').length;
    if (remainingMenuItems <= 1) {
      alert('You must have at least one menu item');
      return;
    }
    
    // Confirm removal
    if (confirm(`Are you sure you want to remove the ${menuItemId.charAt(0).toUpperCase() + menuItemId.slice(1)} section?`)) {
      section.remove();
      updateSummary();
    }
  }

  function initCustomIngredientCalculator(id, name) {
    // Add event listeners to inputs
    const servingsInput = document.getElementById(`${id}Servings`);
    servingsInput.addEventListener('input', debounce(() => calculateCustomIngredients(id)));
    
    // Add event listeners for the add ingredient button
    const addButton = document.getElementById(`add${id.charAt(0).toUpperCase() + id.slice(1)}Ingredient`);
    addButton.addEventListener('click', () => {
      document.getElementById(`${id}IngredientForm`).style.display = 'block';
      document.getElementById(`${id}IngredientName`).focus();
    });
    
    // Add event listeners for the save and cancel buttons
    const saveButton = document.getElementById(`save${id.charAt(0).toUpperCase() + id.slice(1)}Ingredient`);
    saveButton.addEventListener('click', () => {
      const ingredientName = document.getElementById(`${id}IngredientName`).value.trim();
      const amount = parseFloat(document.getElementById(`${id}IngredientAmount`).value) || 0;
      const price = parseFloat(document.getElementById(`${id}IngredientPrice`).value) || 0;
      
      if (ingredientName && amount > 0) {
        addCustomIngredientRow(id, ingredientName, amount, price);
        resetCustomIngredientForm(id);
        calculateCustomIngredients(id);
      }
    });
    
    const cancelButton = document.getElementById(`cancel${id.charAt(0).toUpperCase() + id.slice(1)}Ingredient`);
    cancelButton.addEventListener('click', () => {
      resetCustomIngredientForm(id);
    });
  }

  function resetCustomIngredientForm(id) {
    document.getElementById(`${id}IngredientForm`).style.display = 'none';
    document.getElementById(`${id}IngredientName`).value = '';
    document.getElementById(`${id}IngredientAmount`).value = '';
    document.getElementById(`${id}IngredientPrice`).value = '';
  }

  function addCustomIngredientRow(id, name, amount, price) {
    const tbody = document.querySelector(`#${id}-ingredients-table tbody`);
    const totalRow = tbody.querySelector('.total-row');
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${name}</td>
      <td><input type="number" class="${id}-ingredient-amount" value="${amount}" min="0"></td>
      <td class="${id}-total-amount">0g</td>
      <td class="price-column"><input type="number" class="price-input" value="${price}" min="0" step="0.1"></td>
      <td class="price-column price-display">$0.00</td>
      <td><button class="remove-item-button"><i class="fa fa-trash"></i></button></td>
    `;
    
    // Add event listeners
    newRow.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', debounce(() => calculateCustomIngredients(id)));
    });
    
    newRow.querySelector('.remove-item-button').addEventListener('click', function() {
      tbody.removeChild(newRow);
      calculateCustomIngredients(id);
    });
    
    // Insert before total row
    tbody.insertBefore(newRow, totalRow);
  }

  function calculateCustomIngredients(id) {
    try {
      // Create state object if it doesn't exist
      if (!state.toppings[id]) {
        state.toppings[id] = {
          servings: 0,
          perPiece: 50, // Default 50g per piece
          totalWeight: 0,
          totalCost: 0,
          ingredients: []
        };
      }
      
      // Reset values
      state.toppings[id].ingredients = [];
      state.toppings[id].totalWeight = 0;
      state.toppings[id].totalCost = 0;
      
      // Get inputs
      const servings = parseInt(document.getElementById(`${id}Servings`).value) || 0;
      state.toppings[id].servings = servings;
      
      // Process each ingredient row
      const ingredientRows = document.querySelectorAll(`#${id}-ingredients-table tbody tr:not(.total-row)`);
      ingredientRows.forEach(row => {
        const nameCell = row.cells[0].textContent;
        const amountInput = row.querySelector(`.${id}-ingredient-amount`);
        const totalAmountCell = row.querySelector(`.${id}-total-amount`);
        const priceInput = row.querySelector('.price-input');
        const priceDisplay = row.querySelector('.price-display');
        
        const amount = parseFloat(amountInput.value) || 0;
        const totalAmount = amount * servings;
        
        // Update total amount cell
        if (totalAmountCell) totalAmountCell.textContent = totalAmount + 'g';
        
        const pricePerKg = parseFloat(priceInput.value) || 0;
        const cost = (totalAmount / 1000) * pricePerKg;
        updatePriceDisplay(priceDisplay, cost);
        
        state.toppings[id].totalWeight += totalAmount;
        state.toppings[id].totalCost += cost;
        
        state.toppings[id].ingredients.push({
          name: nameCell,
          amount: amount,
          totalAmount: totalAmount,
          pricePerKg: pricePerKg,
          cost: cost
        });
      });
      
      // Update totals
      const totalWeightElement = document.getElementById(`${id}MixWeight`);
      const totalCostElement = document.getElementById(`${id}MixCost`);
      
      if (totalWeightElement) {
        totalWeightElement.textContent = `${Math.round(state.toppings[id].totalWeight)}g`;
      }
      
      if (totalCostElement) {
        updatePriceDisplay(totalCostElement, state.toppings[id].totalCost);
      }
      
      // Update result info
      const resultElement = document.getElementById(`${id}Result`);
      if (resultElement) {
        resultElement.innerHTML = `<strong>Total ${id} mix needed:</strong> ${Math.round(state.toppings[id].totalWeight)}g`;
      }
      
      // Update summary if we're on that tab
      if (state.activeTab === 'summary') {
        updateSummary();
      }
    } catch (error) {
      console.error(`Error in ${id} calculation:`, error);
    }
  }
  
  // Start the application
  init();

  // Add this to your calculator.js file
  function adjustTitleWidth() {
    const title = document.querySelector('h1');
    const subtitle = document.querySelector('.subtitle');
    
    // Wait for fonts to load to get accurate measurements
    document.fonts.ready.then(() => {
        const titleWidth = title.offsetWidth;
        const subtitleWidth = subtitle.offsetWidth;
        
        if (titleWidth !== subtitleWidth) {
            const currentLetterSpacing = parseFloat(getComputedStyle(title).letterSpacing);
            const adjustment = (subtitleWidth - titleWidth) / (title.textContent.length - 1);
            title.style.letterSpacing = `${currentLetterSpacing + adjustment}px`;
        }
    });
}

  // Call this after DOM loads and on window resize
  window.addEventListener('DOMContentLoaded', adjustTitleWidth);
  window.addEventListener('resize', adjustTitleWidth);

  domElements.globalCurrencySelector.addEventListener('change', function() {
    updateAllPrices();
  });

  function updateAllPrices() {
    const currency = domElements.globalCurrencySelector.value;
    
    // Update all price displays
    document.querySelectorAll('.price-display').forEach(display => {
      const amount = parseFloat(display.getAttribute('data-amount') || display.textContent.replace(/[^0-9.-]+/g, ''));
      if (!isNaN(amount)) {
        display.textContent = formatPrice(amount, currency);
      }
    });
  }

  // Modify your existing price calculation functions to use the new formatPrice function
  function calculateIngredientCost(weight, pricePerKg) {
    const cost = (weight / 1000) * pricePerKg;
    return cost;
  }

  function updatePriceDisplay(element, cost) {
    const currency = domElements.globalCurrencySelector.value;
    element.setAttribute('data-amount', cost);
    element.textContent = formatPrice(cost, currency);
  }

  function calculateZaatarMix() {
    try {
      let totalWeight = 0;
      let totalCost = 0;
      
      domElements.zaatarIngredientAmounts.forEach(input => {
        const amount = parseFloat(input.value) || 0;
        const priceInput = input.closest('tr').querySelector('.price-input');
        const pricePerKg = parseFloat(priceInput.value) || 0;
        const cost = calculateIngredientCost(amount, pricePerKg);
        
        // Update price display with currency
        const priceDisplay = input.closest('tr').querySelector('.price-display');
        updatePriceDisplay(priceDisplay, cost);
        
        totalWeight += amount;
        totalCost += cost;
      });
      
      // Update total weight and cost displays with currency
      domElements.zaatarMixWeight.textContent = `${totalWeight}g`;
      updatePriceDisplay(domElements.zaatarMixCost, totalCost);
      
      // Update batch information
      updateBatch();
    } catch (error) {
      console.error('Error in zaatar mix calculation:', error);
    }
  }

  function calculateCheeseMix() {
    try {
      let totalPercent = 0;
      let totalCost = 0;
      const totalWeight = 1000; // 1kg base weight
      
      domElements.cheeseIngredientPercents.forEach(input => {
        const percent = parseFloat(input.value) || 0;
        const priceInput = input.closest('tr').querySelector('.price-input');
        const pricePerKg = parseFloat(priceInput.value) || 0;
        const weight = (percent / 100) * totalWeight;
        const cost = calculateIngredientCost(weight, pricePerKg);
        
        // Update price display with currency
        const priceDisplay = input.closest('tr').querySelector('.price-display');
        updatePriceDisplay(priceDisplay, cost);
        
        totalPercent += percent;
        totalCost += cost;
      });
      
      // Update total percent and cost displays with currency
      domElements.cheesePercentTotal.textContent = `${totalPercent}%`;
      updatePriceDisplay(domElements.cheeseMixCost, totalCost);
      
      // Update batch information
      updateBatch();
    } catch (error) {
      console.error('Error in cheese mix calculation:', error);
    }
  }

  function calculateMeatMix() {
    try {
      let totalWeight = 0;
      let totalCost = 0;
      
      domElements.meatIngredientAmounts.forEach(input => {
        const amount = parseFloat(input.value) || 0;
        const priceInput = input.closest('tr').querySelector('.price-input');
        const pricePerKg = parseFloat(priceInput.value) || 0;
        const cost = calculateIngredientCost(amount, pricePerKg);
        
        // Update price display with currency
        const priceDisplay = input.closest('tr').querySelector('.price-display');
        updatePriceDisplay(priceDisplay, cost);
        
        totalWeight += amount;
        totalCost += cost;
      });
      
      // Update total weight and cost displays with currency
      domElements.meatMixWeight.textContent = `${totalWeight}g`;
      updatePriceDisplay(domElements.meatMixCost, totalCost);
      
      // Update batch information
      updateBatch();
    } catch (error) {
      console.error('Error in meat mix calculation:', error);
    }
  }

  function hideEditMenuItemForm(buttonElement) {
    const section = buttonElement.closest('.menu-item-section');
    const editForm = section.querySelector('.edit-menu-item-form');
    editForm.style.display = 'none';
  }

  function updateDoughSummary() {
    const tbody = domElements.summaryDough;
    tbody.innerHTML = '';
    
    // Get current currency
    const currency = domElements.globalCurrencySelector.value || 'GBP';
    
    // Calculate scaling factor for batch
    const totalBatchWeight = state.doughRecipe.batch.numBalls * state.doughRecipe.batch.ballWeight;
    const scalingFactor = state.doughRecipe.totalWeight > 0 ? totalBatchWeight / state.doughRecipe.totalWeight : 1;
    
    // Add each dough ingredient
    state.doughRecipe.ingredients.forEach(ingredient => {
      const scaledWeight = Math.round(ingredient.weight * scalingFactor);
      const scaledCost = ingredient.cost * scalingFactor;
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${ingredient.name}</td>
        <td>${scaledWeight}g</td>
        <td class="price-column">${formatPrice(scaledCost, currency)}</td>
      `;
      tbody.appendChild(row);
    });
    
    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    
    const scaledTotalCost = state.doughRecipe.totalCost * scalingFactor;
    
    totalRow.innerHTML = `
      <td>Total Dough</td>
      <td>${Math.round(totalBatchWeight)}g</td>
      <td class="price-column">${formatPrice(scaledTotalCost, currency)}</td>
    `;
    tbody.appendChild(totalRow);
    
    // Add yield information
    const yieldRow = document.createElement('tr');
    yieldRow.className = 'info-row';
    yieldRow.innerHTML = `
      <td>Yield</td>
      <td>${state.doughRecipe.batch.numBalls} dough balls (${state.doughRecipe.batch.ballWeight}g each)</td>
      <td class="price-column"></td>
    `;
    tbody.appendChild(yieldRow);
  }

  // Add before the init() function
  function updateToppingsSummary() {
    const tbody = domElements.summaryToppings;
    tbody.innerHTML = '';
    
    // Get current currency
    const currency = domElements.globalCurrencySelector.value || 'GBP';
    
    // Add zaatar topping if it has ingredients
    if (state.toppings.zaatar.ingredients && state.toppings.zaatar.ingredients.length > 0) {
      // Section header
      const sectionRow = document.createElement('tr');
      sectionRow.className = 'section-row';
      sectionRow.innerHTML = `
        <td colspan="3">Za'atar Topping</td>
      `;
      tbody.appendChild(sectionRow);
      
      // Individual ingredients
      state.toppings.zaatar.ingredients.forEach(ingredient => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${ingredient.name}</td>
          <td>${ingredient.amount}g</td>
          <td class="price-column">${formatPrice(ingredient.cost, currency)}</td>
        `;
        tbody.appendChild(row);
      });
      
      // Add subtotal
      const subtotalRow = document.createElement('tr');
      subtotalRow.className = 'subtotal-row';
      subtotalRow.innerHTML = `
        <td>Za'atar Subtotal</td>
        <td>${state.toppings.zaatar.totalWeight}g</td>
        <td class="price-column">${formatPrice(state.toppings.zaatar.totalCost, currency)}</td>
      `;
      tbody.appendChild(subtotalRow);
    }
    
    // Add cheese topping if it has types
    if (state.toppings.cheese.cheeseTypes && state.toppings.cheese.cheeseTypes.length > 0) {
      // Section header
      const sectionRow = document.createElement('tr');
      sectionRow.className = 'section-row';
      sectionRow.innerHTML = `
        <td colspan="3">Cheese Topping</td>
      `;
      tbody.appendChild(sectionRow);
      
      // Individual cheese types
      state.toppings.cheese.cheeseTypes.forEach(cheese => {
        const row = document.createElement('tr');
        const weight = (cheese.percent / 100) * 1000; // 1kg base weight
        row.innerHTML = `
          <td>${cheese.name}</td>
          <td>${weight}g (${cheese.percent}%)</td>
          <td class="price-column">${formatPrice(cheese.cost, currency)}</td>
        `;
        tbody.appendChild(row);
      });
      
      // Add subtotal
      const subtotalRow = document.createElement('tr');
      subtotalRow.className = 'subtotal-row';
      subtotalRow.innerHTML = `
        <td>Cheese Subtotal</td>
        <td>1000g</td>
        <td class="price-column">${formatPrice(state.toppings.cheese.totalCost, currency)}</td>
      `;
      tbody.appendChild(subtotalRow);
    }
    
    // Add meat topping if it has ingredients
    if (state.toppings.meat.ingredients && state.toppings.meat.ingredients.length > 0) {
      // Section header
      const sectionRow = document.createElement('tr');
      sectionRow.className = 'section-row';
      sectionRow.innerHTML = `
        <td colspan="3">Meat Topping</td>
      `;
      tbody.appendChild(sectionRow);
      
      // Individual ingredients
      state.toppings.meat.ingredients.forEach(ingredient => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${ingredient.name}</td>
          <td>${ingredient.amount}g</td>
          <td class="price-column">${formatPrice(ingredient.cost, currency)}</td>
        `;
        tbody.appendChild(row);
      });
      
      // Add subtotal
      const subtotalRow = document.createElement('tr');
      subtotalRow.className = 'subtotal-row';
      subtotalRow.innerHTML = `
        <td>Meat Subtotal</td>
        <td>${state.toppings.meat.totalWeight}g</td>
        <td class="price-column">${formatPrice(state.toppings.meat.totalCost, currency)}</td>
      `;
      tbody.appendChild(subtotalRow);
    }
    
    // Add banana topping if it has ingredients
    if (state.toppings.banana.ingredients && state.toppings.banana.ingredients.length > 0) {
      // Section header
      const sectionRow = document.createElement('tr');
      sectionRow.className = 'section-row';
      sectionRow.innerHTML = `
        <td colspan="3">Chocolate-Banana Topping</td>
      `;
      tbody.appendChild(sectionRow);
      
      // Individual ingredients
      state.toppings.banana.ingredients.forEach(ingredient => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${ingredient.name}</td>
          <td>${ingredient.amount}g</td>
          <td class="price-column">${formatPrice(ingredient.cost, currency)}</td>
        `;
        tbody.appendChild(row);
      });
      
      // Add subtotal
      const subtotalRow = document.createElement('tr');
      subtotalRow.className = 'subtotal-row';
      subtotalRow.innerHTML = `
        <td>Chocolate-Banana Subtotal</td>
        <td>${state.toppings.banana.totalWeight}g</td>
        <td class="price-column">${formatPrice(state.toppings.banana.totalCost, currency)}</td>
      `;
      tbody.appendChild(subtotalRow);
    }
    
    // Add any custom toppings
    Object.keys(state.customToppings || {}).forEach(id => {
      const topping = state.customToppings[id];
      
      if (topping.ingredients && topping.ingredients.length > 0) {
        // Section header
        const sectionRow = document.createElement('tr');
        sectionRow.className = 'section-row';
        sectionRow.innerHTML = `
          <td colspan="3">${topping.name} Topping</td>
        `;
        tbody.appendChild(sectionRow);
        
        // Individual ingredients
        topping.ingredients.forEach(ingredient => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${ingredient.name}</td>
            <td>${ingredient.amount}g</td>
            <td class="price-column">${formatPrice(ingredient.cost, currency)}</td>
          `;
          tbody.appendChild(row);
        });
        
        // Add subtotal
        const subtotalRow = document.createElement('tr');
        subtotalRow.className = 'subtotal-row';
        subtotalRow.innerHTML = `
          <td>${topping.name} Subtotal</td>
          <td>${topping.totalWeight}g</td>
          <td class="price-column">${formatPrice(topping.totalCost, currency)}</td>
        `;
        tbody.appendChild(subtotalRow);
      }
    });
  }

  function updateCostSummary() {
  const tbody = domElements.summaryCosts;
  tbody.innerHTML = '';
  
  // Get current currency
  const currency = domElements.globalCurrencySelector.value || 'GBP';
  
  // Calculate dough cost per piece
  const doughCostPerPiece = state.doughRecipe.batch.numBalls > 0 ? 
    state.doughRecipe.totalCost / state.doughRecipe.batch.numBalls : 0;
  
  // Calculate total costs
  const totalBatchWeight = state.doughRecipe.batch.numBalls * state.doughRecipe.batch.ballWeight;
  const scalingFactor = state.doughRecipe.totalWeight > 0 ? totalBatchWeight / state.doughRecipe.totalWeight : 1;
  const scaledDoughCost = state.doughRecipe.totalCost * scalingFactor;
  
  // Calculate all toppings cost
  let totalToppingsCost = 0;
  
  // Add standard toppings
  totalToppingsCost += state.toppings.zaatar.totalCost || 0;
  totalToppingsCost += state.toppings.cheese.totalCost || 0;
  totalToppingsCost += state.toppings.meat.totalCost || 0;
  totalToppingsCost += state.toppings.banana.totalCost || 0;
  
  // Add custom toppings
  Object.keys(state.customToppings || {}).forEach(id => {
    totalToppingsCost += state.customToppings[id].totalCost || 0;
  });
  
  // Calculate total project cost
  const totalProjectCost = scaledDoughCost + totalToppingsCost;
  
  // Add dough cost
  const doughRow = document.createElement('tr');
  doughRow.innerHTML = `
    <td>Dough</td>
    <td class="price-column">${formatPrice(scaledDoughCost, currency)}</td>
    <td class="price-column">${totalProjectCost > 0 ? ((scaledDoughCost / totalProjectCost) * 100).toFixed(1) : 0}%</td>
  `;
  tbody.appendChild(doughRow);
  
  // Add toppings cost row
  const toppingsRow = document.createElement('tr');
  toppingsRow.innerHTML = `
    <td>Toppings</td>
    <td class="price-column">${formatPrice(totalToppingsCost, currency)}</td>
    <td class="price-column">${totalProjectCost > 0 ? ((totalToppingsCost / totalProjectCost) * 100).toFixed(1) : 0}%</td>
  `;
  tbody.appendChild(toppingsRow);
  
  // Add total row
  const totalRow = document.createElement('tr');
  totalRow.className = 'total-row';
  totalRow.innerHTML = `
    <td>Total Project Cost</td>
    <td class="price-column">${formatPrice(totalProjectCost, currency)}</td>
    <td class="price-column">100%</td>
  `;
  tbody.appendChild(totalRow);
  
  // Add per-item cost rows
  if (state.doughRecipe.batch.numBalls > 0) {
    const itemCostHeader = document.createElement('tr');
    itemCostHeader.className = 'section-row';
    itemCostHeader.innerHTML = `
      <td colspan="3">Cost Per Item</td>
    `;
    tbody.appendChild(itemCostHeader);
    
    // Add dough cost per piece
    const doughItemRow = document.createElement('tr');
    doughItemRow.innerHTML = `
      <td>Dough (per piece)</td>
      <td class="price-column">${formatPrice(doughCostPerPiece, currency)}</td>
      <td></td>
    `;
    tbody.appendChild(doughItemRow);
    
    // Add za'atar cost per piece if set up
    if (state.toppings.zaatar.perPiece > 0) {
      const zaatarCostPerPiece = state.toppings.zaatar.servings > 0 ? 
        state.toppings.zaatar.totalCost / state.toppings.zaatar.servings : 0;
      
      const zaatarRow = document.createElement('tr');
      zaatarRow.innerHTML = `
        <td>Za'atar (per piece)</td>
        <td class="price-column">${formatPrice(zaatarCostPerPiece, currency)}</td>
        <td></td>
      `;
      tbody.appendChild(zaatarRow);
      
      // Add za'atar manakish total
      const zaatarTotalRow = document.createElement('tr');
      zaatarTotalRow.className = 'item-total-row';
      zaatarTotalRow.innerHTML = `
        <td>Za'atar Manakish Total</td>
        <td class="price-column">${formatPrice(doughCostPerPiece + zaatarCostPerPiece, currency)}</td>
        <td></td>
      `;
      tbody.appendChild(zaatarTotalRow);
    }
    
    // Add cheese cost per piece if set up
    if (state.toppings.cheese.perPiece > 0) {
      const cheeseCostPerPiece = state.toppings.cheese.servings > 0 ? 
        state.toppings.cheese.totalCost / state.toppings.cheese.servings : 0;
      
      const cheeseRow = document.createElement('tr');
      cheeseRow.innerHTML = `
        <td>Cheese (per piece)</td>
        <td class="price-column">${formatPrice(cheeseCostPerPiece, currency)}</td>
        <td></td>
      `;
      tbody.appendChild(cheeseRow);
      
      // Add cheese manakish total
      const cheeseTotalRow = document.createElement('tr');
      cheeseTotalRow.className = 'item-total-row';
      cheeseTotalRow.innerHTML = `
        <td>Cheese Manakish Total</td>
        <td class="price-column">${formatPrice(doughCostPerPiece + cheeseCostPerPiece, currency)}</td>
        <td></td>
      `;
      tbody.appendChild(cheeseTotalRow);
    }
    
    // Add meat cost per piece if set up
    if (state.toppings.meat.perPiece > 0) {
      const meatCostPerPiece = state.toppings.meat.servings > 0 ? 
        state.toppings.meat.totalCost / state.toppings.meat.servings : 0;
      
      const meatRow = document.createElement('tr');
      meatRow.innerHTML = `
        <td>Meat (per piece)</td>
        <td class="price-column">${formatPrice(meatCostPerPiece, currency)}</td>
        <td></td>
      `;
      tbody.appendChild(meatRow);
      
      // Add meat manakish total
      const meatTotalRow = document.createElement('tr');
      meatTotalRow.className = 'item-total-row';
      meatTotalRow.innerHTML = `
        <td>Meat Manakish Total</td>
        <td class="price-column">${formatPrice(doughCostPerPiece + meatCostPerPiece, currency)}</td>
        <td></td>
      `;
      tbody.appendChild(meatTotalRow);
    }
    
    // Add banana cost per piece if set up
    if (state.toppings.banana.perPiece > 0) {
      const bananaCostPerPiece = state.toppings.banana.servings > 0 ? 
        state.toppings.banana.totalCost / state.toppings.banana.servings : 0;
      
      const bananaRow = document.createElement('tr');
      bananaRow.innerHTML = `
        <td>Chocolate-Banana (per piece)</td>
        <td class="price-column">${formatPrice(bananaCostPerPiece, currency)}</td>
        <td></td>
      `;
      tbody.appendChild(bananaRow);
      
      // Add banana manakish total
      const bananaTotalRow = document.createElement('tr');
      bananaTotalRow.className = 'item-total-row';
      bananaTotalRow.innerHTML = `
        <td>Chocolate-Banana Manakish Total</td>
        <td class="price-column">${formatPrice(doughCostPerPiece + bananaCostPerPiece, currency)}</td>
        <td></td>
      `;
      tbody.appendChild(bananaTotalRow);
    }
    
    // Add any custom toppings
    Object.keys(state.customToppings || {}).forEach(id => {
      const topping = state.customToppings[id];
      
      if (topping.perPiece > 0) {
        const costPerPiece = topping.servings > 0 ? 
          topping.totalCost / topping.servings : 0;
        
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${topping.name} (per piece)</td>
          <td class="price-column">${formatPrice(costPerPiece, currency)}</td>
          <td></td>
        `;
        tbody.appendChild(row);
        
        // Add custom topping manakish total
        const totalRow = document.createElement('tr');
        totalRow.className = 'item-total-row';
        totalRow.innerHTML = `
          <td>${topping.name} Manakish Total</td>
          <td class="price-column">${formatPrice(doughCostPerPiece + costPerPiece, currency)}</td>
          <td></td>
        `;
        tbody.appendChild(totalRow);
      }
    });
  }
}
});
