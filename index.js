document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('countries-table');
  
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => {
        data.forEach(country => {
          const name = country.name;
          const capital = country.capital;
          const languages = country.languages;
          const population = country.population;
          const area = country.area;
  
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${name}</td>
            <td>${capital}</td>
            <td>${languages}</td>
            <td>${population}</td>
            <td>${area}</td>
          `;
          table.appendChild(row);
        });
      })
      .catch(error => console.log('Error:', error));
  });

  

  document.addEventListener('DOMContentLoaded', function() {
    const catNamesList = document.getElementById('cat-names-list');
  
    fetch('https://api.thecatapi.com/v1/breeds')
      .then(response => response.json())
      .then(data => {
        const catNames = data.map(cat => cat.name);
        catNames.forEach(name => {
          const listItem = document.createElement('li');
          listItem.textContent = name;
          catNamesList.appendChild(listItem);
        });
      })
      .catch(error => console.log('Error:', error));
  });
  

  document.addEventListener('DOMContentLoaded', function() {
    // Task 1: Average Weight of Cats in Metric Unit
    fetch('https://api.thecatapi.com/v1/breeds')
      .then(response => response.json())
      .then(data => {
        const weights = data.map(cat => cat.weight.metric.split('-'));
        const flattenedWeights = weights.flat().map(weight => parseFloat(weight));
        const totalWeight = flattenedWeights.reduce((sum, weight) => sum + weight, 0);
        const averageWeight = totalWeight / flattenedWeights.length;
        document.getElementById('average-weight').textContent = averageWeight.toFixed(2);
      })
      .catch(error => console.log('Error:', error));
  
    // Task 2: 10 Largest Countries
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => {
        const sortedByArea = data.sort((a, b) => b.area - a.area);
        const largestCountries = sortedByArea.slice(0, 10);
        const largestCountriesTable = document.getElementById('largest-countries-table');
  
        largestCountries.forEach(country => {
          const row = document.createElement('tr');
          const nameCell = document.createElement('td');
          const areaCell = document.createElement('td');
          
          nameCell.textContent = country.name;
          areaCell.textContent = country.area.toLocaleString();
  
          row.appendChild(nameCell);
          row.appendChild(areaCell);
          largestCountriesTable.appendChild(row);
        });
      })
      .catch(error => console.log('Error:', error));
  
    // Task 3: Total Number of Official Languages
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => {
        const languages = new Set();
        data.forEach(country => {
          country.languages.forEach(language => {
            if (language.official) {
              languages.add(language.name);
            }
          });
        });
        document.getElementById('total-languages').textContent = languages.size;
      })
      .catch(error => console.log('Error:', error));
  });
  