export default {
  "*": {
    theme: {
      sidebar: false,
      navbar: false,
      breadcrumb: false,
      // Disable git-based "last updated" (avoids prerender issues on Vercel shallow clones / bad timestamps).
      timestamp: false,
    },
  },
  index: {
    display: "hidden",
  },
  "mask": {
    title: "Mask",
    type: "page",
  },
  "password": {
    title: "Password",
    type: "page",
  },
};
