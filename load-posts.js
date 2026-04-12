document.addEventListener("DOMContentLoaded", () => {
  fetch('posts.json')
    .then(response => response.json())
    .then(posts => {
      const listContainer = document.getElementById('dynamic-post-list');
      
      if (listContainer) {
        // Check if the container has a limit (e.g., 2 for the homepage)
        const limit = listContainer.getAttribute('data-limit');
        const postsToShow = limit ? posts.slice(0, parseInt(limit)) : posts;

        postsToShow.forEach((post, index) => {
          // Calculate delay for the animation (100, 200, 300, etc.)
          const delayClass = `delay-${(index + 1) * 100}`;
          
          const cardHTML = `
            <a href="${post.url}" class="block group cursor-pointer scroll-scale-up ${delayClass} h-full">
              <div class="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden flex flex-col h-full">
                
                <div class="w-full h-[220px] sm:h-[280px] md:h-[320px] overflow-hidden relative bg-gray-50">
                  <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                
                <div class="p-6 sm:p-8 md:p-10 flex flex-col flex-grow">
                  
                  <div class="flex items-center justify-between mb-4 sm:mb-5">
                    <span class="px-3 py-1 sm:px-4 sm:py-1.5 bg-gray-50 text-gray-700 text-[10px] sm:text-xs font-bold tracking-wider rounded-full border border-gray-100 uppercase">
                      ${post.category}
                    </span>
                    <span class="text-xs sm:text-sm text-gray-400 font-medium">
                      ${post.date}
                    </span>
                  </div>
                  
                  <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-gray-600 transition-colors line-clamp-2">
                    ${post.title}
                  </h3>
                  
                  <p class="text-sm sm:text-base text-gray-500 font-light leading-relaxed mb-6 sm:mb-8 flex-grow line-clamp-3">
                    ${post.description}
                  </p>
                  
                  <div class="mt-auto text-xs sm:text-sm font-bold text-black flex items-center gap-2 group-hover:text-gray-600 transition-colors">
                    Read Article
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>

                </div>
              </div>
            </a>
          `;
          listContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Re-trigger your IntersectionObserver for the newly injected cards so they animate properly
        const newCards = listContainer.querySelectorAll('.scroll-scale-up');
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
        
        newCards.forEach(card => observer.observe(card));
      }
    })
    .catch(error => console.error('Error loading posts:', error));
});