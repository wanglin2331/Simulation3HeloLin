module.exports = {
    getAll: (req, res) => {
      const db = req.app.get("db");
      db.get_posts().then(posts => {
        res.send(posts);
      });
    },

    getOwn: (req, res) => {
        const db = req.app.get("db");
        const user_id = req.user.id;
        db.get_own_posts({ user_id }).then(posts => {
          res.send(posts);
        });
      },

    create: (req, res) => {
        const db = req.app.get("db");
        let newPostObj = {
            user_id: req.user.id,
            title: req.body.title,
            image_url: req.body.image_url,
            description: req.body.description
          };
        //we can accomplish the same if we do let newPostObj = {...req.body,req.user.id} for above
        db.create(newPostObj).then(result => {
          res.send(results);
        });
      }
};