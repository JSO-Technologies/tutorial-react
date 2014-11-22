var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="commentBox">
				Here's come the comment box
			</div>
		);
	}
});

React.render(
	<CommentBox/>,
	document.getElementById('content')
);