# Welcome to GitHub docs contributing guide

Thank you for investing your time in contributing to our project! 
Any contribution you make will be reflected on [https://gitboardweb.vercel.app/](https://gitboardweb.vercel.app/) :sparkles:.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

Use the table of contents icon <img src="https://github.com/github/docs/blob/main/contributing/images/table-of-contents.png" width="25" height="25" /> on the top left corner of this document to get to a specific section of this guide quickly.


### Issues

#### Create a new issue

If you spot a problem with the docs, [search if an issue already exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/github/docs/issues/new/choose).

#### Solve an issue

Scan through our [existing issues](https://github.com/github/docs/issues) to find one that interests you. You can narrow down the search using `labels` as filters. See [Labels](/contributing/how-to-use-labels.md) for more information. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

## <span id="contributing">🤝 Contributing</span>

Follow these steps to contribute to the project:

- ### Step 1

  Fork this repository
<p align="center">
  <img src="https://github.com/aashay28/GitBoard/assets/108337259/512ffce8-85f6-4873-9437-4a77bd8dbc7a" alt="fork" />
</p>

- ### Step 2:

  Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the code button and then click the copy to clipboard icon.

<p align="center">
  <img src="https://github.com/aashay28/GitBoard/assets/108337259/aa3f2ad9-a90f-4363-ab50-e2afe0ef632d" alt="clone">
</p>

Open a terminal and run the following git command:

```bash
git clone "url you just copied"
```

where "url you just copied" (without the quotation marks) is the url to this repository (your fork of this project). See the previous steps to obtain the url.

<p align="center">
  <img src="https://github.com/aashay28/GitBoard/assets/108337259/2902da0f-fe07-42fe-a63c-a26f55d68b6f" alt="opy">
</p>

The code will look something like this :

```bash
git clone https://github.com/{your user name}/GitBoard.git
```

- ### Step 3:

  Navigate to GitBoard on your device

  ```bash
  cd GitBoard/
  ```
   ```bash
  npm install
  ```
   ```bash
   npm run dev
   ```
  
- ### Step 4:

  - Add an upstream link to the main branch in your cloned repo

  ```bash
  git remote add upstream https://github.com/aashay28/GitBoard
  ```

  - Keep your cloned repo up to date by pulling from upstream (this will also avoid any merge conflicts while committing new changes)

  ```bash
  git pull upstream main
  ```

- ### Step 5:

  Create your feature branch (This is a necessary step, so don't skip it)

  ```bash
  git checkout -b <feature-name>
  ```

- ### Step 6: Make necessary changes and commit those changes

  Add your commits to the staging

  ```
  git add .
  ```

- ### Step 7: Commit the changes

  - Now commit those changes using the `git commit` command:

  ```bash
  git commit -m "Write a meaningful but small commit message"
  ```

- ### Step 8: Push your code.

  Push your changes using the command `git push` :

  ```bash
  git push -u origin your-branch-name
  ```

- ### Step 9:

  Create a PR on Github. (Don't just hit the create a pull request button, you must write a PR message to clarify why and what are you contributing)










