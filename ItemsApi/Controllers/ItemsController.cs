using ItemsApi.Models;
using ItemsApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ItemsApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemsController : ControllerBase
{
    private readonly ItemService _service;
    private readonly ILogger<ItemsController> _logger;

    public ItemsController(ItemService service, ILogger<ItemsController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult GetAll()
    {
        _logger.LogInformation("GET /items");
        return Ok(_service.GetAll());
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public IActionResult Create([FromBody] Item item)
    {
        _logger.LogInformation("POST /items value={Value}", item.Value);
        var (success, message) = _service.Add(item.Value);

        if (!success)
            return Conflict(new { message });

        return StatusCode(201, new { message });
    }

    [HttpDelete("{value:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Delete(int value)
    {
        _logger.LogInformation("DELETE /items/{Value}", value);
        var (success, message) = _service.Remove(value);

        if (!success)
            return NotFound(new { message });

        return Ok(new { message });
    }
}
