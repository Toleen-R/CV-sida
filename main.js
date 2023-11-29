document.addEventListener('DOMContentLoaded', async function () {
    //-------------Hämta main element med ID "mainCv"-------------------
      const mainCv = document.getElementById('mainCv');
    
     //-------------Fetcha JSON använd await..------------------- 
     const response = await fetch('cv.json');
          const data = await response.json();
          showCv(data);
    
    });
    
    //-------------------CV data---------------------
      function showCv(cvData) {
          const sections = [
              {
                  title: 'Utbildning',
                  key: 'utbildning',
                  fields: ['titel', 'skola', 'datum']
              },
              {
                  title: 'Kunskaper',
                  key: 'kunskaper',
                  fields: null
              },
              {
                  title: 'Arbetslivserfarenhet',
                  key: 'arbetslivserfarenhet',
                  fields: ['titel', 'datum', 'plats', 'beskrivning']
              }
          ];
    
    // Använd arraymapping för varje sektion så att var och en är synlig
          sections.forEach(section => {
              mainCv.innerHTML += `
              <section>
                  <h2>${section.title}</h2>
                  ${
                      section.key === 'kunskaper'
                      // "?" indikerar att värdet returneras om villkoret är sant 
                          ? `<ul>${cvData[section.key].map(skill => `<li>${skill}</li>`).join('')}</ul>`
                          : cvData[section.key].map(item => `
                          <div>
                              ${section.fields.map(field => `
                              <p><strong>${field.charAt(0).toUpperCase() + field.slice(1)}:</strong> ${item[field] || ''}</p>`).join('')}
                          </div>`).join('')
                  }
                  </section>`;
    
    //-------------Lägg till en horisontell linje mellan sektionerna-----------
              mainCv.innerHTML += '<hr>';
          });
    
    // -------------lägg till Dark Mode funktion-------------------
    // 1. Hämta toggle element med ID från html
          const toggle = document.getElementById('toggleDark');
          const body = document.querySelector('body');
    // 2. Lägg till addEventListener så att funktionen är kooperativ
          toggle.addEventListener('click', function () {
              body.classList.toggle('dark-mode');
              toggle.classList.toggle('bi-moon');
              if(this.classList.toggle('bi-brightness-high-fill')){
                body.style.background = 'white';
                body.style.transition = '2s';
              }else{
                body.style.background = 'black';
                body.style.transition = '2s';
            }
          });
      };
     
      /*
      Källan för Dark Mode funktionen!!
      https://www.codeinwp.com/snippets/dark-mode-toggle-button-javascript/
      */
    