var converter = new Showdown.converter();

var Comment = React.createClass({
	render: function() {
		var rawMarkup = converter.makeHtml(this.props.children.toString());
		return (
			<div className="comment">
				<h2 className="commentAuthor">{this.props.author}</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return <Comment author={comment.author}>{comment.text}</Comment>;
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();

		var author = this.refs.author.getDOMNode().value.trim();
		var text = this.refs.text.getDOMNode().value.trim();
		if (!text || !author) {
			return;
		}

		this.props.onCommentSubmit({author: author, text: text});

		this.refs.author.getDOMNode().value = '';
		this.refs.text.getDOMNode().value = '';
	},
	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" ref="author" placeholder="Your name"/>
				<input type="text" ref="text" placeholder="Your comment"/>
				<input type="submit" value="Send"/>
			</form>
		);
	}
});

var CommentBox = React.createClass({
	getInitialState: function() {
		return {data : []};
	},
	addComment: function(comment) {
		this.state.data.push(comment);
		this.setState({data: this.state.data});
	},
	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success : function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	componentDidMount: function() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.addComment}/>
			</div>
		);
	}
});

React.render(
	<CommentBox url="data/comments.json" pollInterval={2000}/>,
	document.getElementById('content')
);