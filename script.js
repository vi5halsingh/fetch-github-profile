 function getUserData(userName){
    return fetch(`https://api.github.com/users/${userName}` || 'https://github.com/vi5halsingh').then((raw) =>{
        if(!raw.ok){
            throw new Error("Something went wrong") 
        }
    return raw.json();
    }).catch((err) =>{  
        throw new Error(err) 
    })
}



function getRepos(userName){ 
       return fetch(`https://api.github.com/users/${userName}/repos`).then((raw) =>{
                if(!raw.ok){
                throw new Error("Something went wrong")
        }   
        return raw.json();
    }).catch((err) =>{
        throw new Error(err) 
    })
}
const input = document.querySelector("input");
function fetchData(){
    // alert("hello")
    const input = document.querySelector("input").value.trim();
    // const input = document.querySelector("input").value.trim();
    if (!input) {
        console.error("First you should enter Input 🙂");
        return;
    }
    const userName = input.includes('github.com/')? input.split('github.com/')[1].split('/')[0] : input;
    const card = document.querySelector(".card");
  
   
    getUserData(userName).then((data) =>{
        
    
    
    if(!data){
        card.innerHTML = "No data found"
    }
   
          card.innerHTML = `
    <div class="p-6 flex justify-center md:justify-start">
      <img src="${data.avatar_url}" alt="User Avatar" class="w-36 h-36 rounded-full border border-gray-600">
    </div>

    <!-- User Info -->
    <div class="p-6 flex-1">
      <h2 class="text-2xl font-bold text-white">${data.name}</h2>
      <p class="text-gray-400">@${data.login}</p>
      <p class="mt-2 text-gray-300">${data.bio ? data.bio : 'N/A'}</p>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-6 text-sm mt-4 text-gray-400">
        <div><span class="font-semibold text-white">Company:  ${data.company ? data.company : 'N/A'}</span></div>
        <div><span class="font-semibold text-white">Location: ${data.location ? data.location : 'N/A'}</span> </div>
        <div><span class="font-semibold text-white">Email: ${data.email ? data.email : 'N/A'}</span> </div>
        <div><span class="font-semibold text-white">Blog: ${data.blog ? data.blog : 'N/A'}</span> <a href="https://github.blog" class="text-blue-400 hover:underline"></a></div>
        <div><span class="font-semibold text-white">Twitter:  ${data.twitter_username ? data.twitter_username : 'N/A'}</span></div>
        <div><span class="font-semibold text-white">Hireable:  ${data.hireable? 'Yes' : 'NO'}</span></div>
      </div>

      <div class="flex flex-wrap gap-6 mt-6 text-sm text-gray-300">
        <span>📦 <strong class="text-white">Public Repos: ${data.public_repos}</strong></span>
        <span>📝 <strong class="text-white">Gists: ${data.public_gists}</strong></span>
        <span>👥 <strong class="text-white">Follower: ${data.followers}</strong> </span>
        <span>👣 <strong class="text-white">following: ${data.following}</strong></span>
        <span>📅 <strong class="text-white">Joined:</strong> ${new Date(data.created_at).toLocaleDateString()
        }</span>
      </div>

      <a href="${data.html_url}" target="_blank" class="inline-block mt-6 text-blue-400 hover:underline">
        View Full GitHub Profile →
      </a>
    </div>
`;
    })
const repos = document.querySelector(".repo-card");
    // fetching rep
    getRepos(userName).then((data) => {
        let repoHtml = '';
        data.forEach(repo => {
            repoHtml += `
            <div class="singleRepo bg-[#161b22] border border-[#30363d] rounded-xl p-5 w-full max-w-xl text-white shadow hover:shadow-lg transition">
                <!-- Repo Name -->
                <a href="${repo.html_url}" target="_blank" class="text-xl font-semibold text-blue-400 hover:underline flex items-center gap-2">
                    <i data-feather="book-open" class="w-5 h-5 text-gray-400"></i>
                    ${repo.name}
                </a>
    
                <p class="text-gray-300 mt-2">
                    ${repo.description || 'No description available'}
                </p>
    
                <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400 mt-4">
                    ${repo.language ? `
                    <div class="flex items-center gap-1">
                        <i data-feather="code" class="w-4 h-4 text-yellow-400"></i>
                        <span class="text-white">${repo.language}</span>
                    </div>` : ''}
    
                    <div class="flex items-center gap-1">
                        <i data-feather="star" class="w-4 h-4 text-yellow-400"></i>
                        <span class="text-white">${repo.stargazers_count}</span>
                    </div>
    
                    <div class="flex items-center gap-1">
                        <i data-feather="git-branch" class="w-4 h-4 text-purple-400"></i>
                        <span class="text-white">${repo.forks_count}</span>
                    </div>
    
                    <div class="flex items-center gap-1">
                        <i data-feather="clock" class="w-4 h-4 text-blue-400"></i>
                        <span class="text-white">${new Date(repo.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>`;
        });
    
        // 👇 First update the HTML
        repos.innerHTML = '<h2 class="text-2xl font-bold text-white w-full">Repositories:</h2>' + repoHtml;
    
        // 👇 Then replace icons after HTML is in the DOM
        feather.replace();
    
    }).catch(error => {
        console.error('Error fetching repositories:', error);
        repos.innerHTML = '<p class="text-red-500">Error loading repositories</p>';
    });
    
    input.value = "";
}

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      fetchData()
    }
  });

