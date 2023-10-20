using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAP_dotnet.Data;
using SAP_dotnet.DTOS;
using SAP_dotnet.Models;

namespace SAP_dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController:ControllerBase
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public ProductsController(StoreContext context,IMapper mapper)
        {
            _context=context;
            _mapper=mapper;
        }
        [HttpGet("getProducts")]
        public async Task<ActionResult<List<Product>>> GetProducts(){
            var products=await _context.Products.ToListAsync();
            if (products==null) return NotFound();
            return products;
        }
        [HttpGet("getProductById")]
        public async Task<ActionResult<Product>> GetProductId(int id){
            var product=await _context.Products.FindAsync(id);
            if (product==null) return NotFound();
            return product;
        }
        
        [HttpPost("addProduct")]
        public async Task<ActionResult<List<Product>>> AddProduct(ProductDTO productDTO){
            var product=_mapper.Map<Product>(productDTO);
            _context.Add(product);
            await _context.SaveChangesAsync();
            var products=await _context.Products.ToListAsync();
            return products;
        }
        [HttpDelete("deleteProductById")]
        public async Task<ActionResult<List<Product>>> DeleteProduct(int id){
            var product=await _context.Products.FindAsync(id);
            if (product==null) return NotFound();
             _context.Products.Remove(product);
             await _context.SaveChangesAsync();
             var products=await _context.Products.ToListAsync();
            return products;
        }

    }
}