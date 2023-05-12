/**
 * @description
 * css_path and script_path start from "pages" folder
 */

const description = "Gis Web Management";

const postsRender = {
  getPostsPage: async (req, res) => {
    const locals = {
      breadcrumb: [
        {
          tag: "Quản trị",
          link: "/admin/home",
        },
        {
          tag: "Bài viết",
          link: "#",
        },
      ],
      title: "Admin | Bài viết",
      page_required: false,
      description,
    };
    return res.render("pages/management/posts/posts.ejs", {
      locals,
      layout: "layouts/main",
    });
  },
};

module.exports = postsRender;
