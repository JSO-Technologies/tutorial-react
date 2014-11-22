var CommentList = React.createClass({
	render: function() {
		return (
			<div className="commentList">
			Here's come the comment list
			</div>
			);
	}
});

var CommentForm = React.createClass({
	render: function() {
		return (
			<div className="commentForm">
			Here's come the comment form
			</div>
			);
	}
});

var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList/>
				<CommentForm/>
			</div>
		);
	}
});

React.render(
	<CommentBox/>,
	document.getElementById('content')
);