(function(window, $, Backbone, undefined) {

	var Model = Backbone.Model.extend({
		defaults: {
			title: "Empty todo.....",
			done: false
		},
		url: "Url to get he object for model"
	});



	var Collection = Backbone.Collection.extend({
		model: Model,
		localStorage: new Backbone.LocalStorage("name"),

	});

	var collection = new Collection();

	var AppView = Backbone.View.extend({

		el: $("#app-view"),

		tagName: "li",
		className: "className",

		// template: _.template($('#template_id').html()),

		initialize: function() {
			this.collection = collection;
			// this.listenTo(this.model, "change", this.render);
			// this.listenTo(this.collection, "change", this.render);
			// this.listenTo(this.collection, 'add', this.addOne);
			// this.listenTo(this.collection, 'all', this.render);
		},


		events: {
			// "click .icon": "open",
			// "click .button.edit": "openEditDialog",
			// "click .button.delete": "destroy",
			// "keypress #new-todo": "createOnEnter"
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			// this.$el.toggleClass('done', this.model.get('done'));
		}

	});

	var App = new AppView();



	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "home",
			"posts/:id": "getPost",
			"*actions": "defaultRoute" // Backbone will try match the route above first
		},

		initialize: function() {
			console.log("initialize Router");
		},
		home: function() {
			if (!this.homeView) {
				this.homeView = new HomeView();
				this.homeView.render();
			} else {
				this.homeView.delegateEvents();
			}
			$("app-view").html(this.homeView.el);
		},
		getPost: function(id) {
			if (!this.homeView) {
				this.homeView = new HomeView();
				this.homeView.render();
			} else {
				this.homeView.delegateEvents();
			}
			$("app-view").html(this.homeView.el);
			console.log(id);
		},
		defaultRoute: function(actions) {
			alert(actions);
		}


	});
	// Instantiate the router
	var appRouter = new AppRouter;

	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();


})(window, $, Backbone);