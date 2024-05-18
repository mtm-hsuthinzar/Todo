function Element(props) {
	return <div>
        <h1>React Build</h1>
        <ul>
            <li>Item One</li>
            <li>Item Two</li>
            <li>Item Three</li>
            <li>Item Four</li>
            <li>Item Five</li>
            <li>Item Six</li>
            <li>Item Seven</li>
            <li>Item Eight</li>
        </ul>
    </div>;
}

ReactDOM.render(
	<Element content="A React Component" />,
	document.getElementById("app")
);