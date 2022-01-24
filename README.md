# Using ReactJs In One Mvc View (ASP.NET Core - .NET 6)

> إستخدام ReactJs داخل صفحة واحدة فى MVC Core .NET 6

## ValuesController.cs

```c#
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new
            {
                data = Enumerable.Range(1, 10)
                .Select(i => new { Id = i, Text = "Value " + i })
            });
        }
    }

```

## Values.cshtml

```html
    <div class='row'>
        <div id="values-list" class="col-3">
            <!-- React Component will render here and replace the following code -->
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
```

## Scripts Section in Values.cshtml

```HTML+Razor
    @section Scripts
    {
        <environment include="Development">
            <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
            <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
        </environment>
        <environment include="Production">
            <script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
            <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>
        </environment>
        <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

        <script type="text/babel" src="/app/js/values-list.component.js"></script>
    }
```

## Values-list.component.js

```javascript
    class ValuesList extends React.Component {
        constructor(props) {
            super(props);
            this.state = { values: [] };
        }

        componentDidMount() {
            fetch('/api/values').then(async response => {
                const result = await response.json();
                if (result.data) {
                    this.setState({ values: result.data });
                }
            });
        }

        render() {
            const { values } = this.state;
            return (
                <ul className="list-group">
                    {
                        values.map(v => <ValuesListItem key={v.id} item={v} ></ValuesListItem>)
                    }
                </ul>
            );
        }
    }

    class ValuesListItem extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            const item = this.props.item;
            return (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    {item.text}
                    <span className="badge bg-primary rounded-pill">{item.id}</span>
                </li>
            );
        }
    }

    ReactDOM.render(
        <ValuesList />,
        document.getElementById('values-list')
    );
```
