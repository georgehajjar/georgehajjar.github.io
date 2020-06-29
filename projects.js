window.onload = function() {
  getGithubData()
}

const baseURL = "https://api.github.com";
var names = ["uome", "CryptoCharts", "cashcounter", "waterTimer"];

function getGithubData() {
  names.forEach(name => {
    var repoRequest = new XMLHttpRequest();
    repoRequest.open('GET', baseURL + "/users/georgehajjar/repos", false);
    repoRequest.onload = function () {
      var data = JSON.parse(this.response);
      if (repoRequest.status >= 200 && repoRequest.status < 400) {
        data.forEach(repo => {
          if(repo.name == name) {
            document.getElementById(name + "Description").innerHTML = repo.description;
            var date = new Date(repo.updated_at);
            document.getElementById(name + "LastUpdated").innerHTML += date.toDateString();
          }
        })
      }
    }
    repoRequest.send();

    var commitRequest = new XMLHttpRequest();
    commitRequest.open('GET', baseURL + "/repos/georgehajjar/" + name + "/commits", false);
    commitRequest.onload = function () {
      var data = JSON.parse(this.response);
      if (commitRequest.status >= 200 && commitRequest.status < 400) {
        document.getElementById(name + "TotalCommits").innerHTML += data.length;
      }
    }
    commitRequest.send();

    var languageRequest = new XMLHttpRequest();
    languageRequest.open('GET', baseURL + "/repos/georgehajjar/" + name + "/languages", false);
    languageRequest.onload = function () {
      var data = JSON.parse(this.response);
      if (languageRequest.status >= 200 && languageRequest.status < 400) {
        var totalPercentage = 0;
        for(let elem in data) {
          totalPercentage = totalPercentage + data[elem];
        }
        for(let elem in data) {
          document.getElementById(name + "Languages").innerHTML += `${elem} ${Math.round((data[elem]/totalPercentage)*100)}% `;
        }
      }
    }
    languageRequest.send();
  });
}

// curl -i https://api.github.com/users/georgehajjar
