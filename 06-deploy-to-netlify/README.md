# 06-deploy-to-netlify

In this sample we will deploy this app to Netlify.

We will start from previous example `05-blog-from-contentful`:

```bash
npm install
```

- First, we need to upload this app to a repository.

```bash
git init
git remote add origin https://github.com/...
git add .
git commit -m "initial commit"
git push -u origin master
```

- Create an account in [Netlify](https://www.netlify.com/).

- Connect Netlify with repository:

![16-connect-netlify-with-repo](readme-resources/16-connect-netlify-with-repo.png)

- Select repository:

![17-select-repository](readme-resources/17-select-repository.png)

- Show advance settings, add env variables and deploy site:

![18-show-advance-settings](readme-resources/18-show-advance-settings.png)

![19-add-env-variables](readme-resources/19-add-env-variables.png)


- Now site is deployed. We can see that we can access to `https` site, so we have SSL for free.

- Some other features:
  - Set up a custom domain.
  - Collect data from a `form` element.
  - Add `build hooks`.

- We can see an example how to configure a `build hook` to run a deploy when some content change in Contentful:

![20-access-to-site](./readme-resources/20-access-to-site.png)

![21-access-to-site-settings](./readme-resources/21-access-to-site-settings.png)

- Add `build hook`:

![22-add-build-hook](./readme-resources/22-add-build-hook.png)

![23-add-contentful-hook](./readme-resources/23-add-contentful-hook.png)

- Configure web hook in Contentful:

![24-add-webhook-in-contentful](./readme-resources/24-add-webhook-in-contentful.png)

![25-create-contentful-web-hook](./readme-resources/25-create-contentful-web-hook.png)

- Finally we can update the `triggers`:

![26-update-triggers](./readme-resources/26-update-triggers.png)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
