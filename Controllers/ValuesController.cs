using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReactInMvcCoreDemo.Controllers
{
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
}
