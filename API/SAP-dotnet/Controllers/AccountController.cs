using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SAP_dotnet.Data;
using SAP_dotnet.DTOS;
using SAP_dotnet.Models;
using SAP_dotnet.Services;

namespace SAP_dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController:ControllerBase
    {
        private readonly StoreContext _context;
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(StoreContext context,UserManager<User> userManager,TokenService tokenService)
        {
            _context = context;
            _userManager = userManager;
            _tokenService=tokenService;
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login (LoginDTO login){
            var user=await _userManager.FindByNameAsync(login.Username);
            if (user ==null || !await _userManager.CheckPasswordAsync(user,login.Password) )return Unauthorized();
            return new UserDTO{
                Email=user.Email!,
                Token=await _tokenService.GenerateToken(user),
                AdresaStanovanja=user.AdresaStanovanja,
                Ime=user.Ime,
                Prezime=user.Prezime,
                Username=user.UserName

            };

        }
        [HttpPost("register")]
        public async Task<ActionResult> Register (RegisterDTO registerDTO){
            var user =new User {UserName=registerDTO.Username,Email=registerDTO.Email,Ime=registerDTO.Ime,Prezime=registerDTO.Prezime,AdresaStanovanja=registerDTO.AdresaStanovanja};
            var result=await _userManager.CreateAsync(user,registerDTO.Password);
            if (!result.Succeeded){
                
            
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }     
                return ValidationProblem();
            }
            return StatusCode(201);
            
        }
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser(){
            var user=await _userManager.FindByNameAsync(User.Identity?.Name!);
            return new UserDTO{
                Email=user?.Email!,
                Token=await _tokenService.GenerateToken(user!),
                AdresaStanovanja=user.AdresaStanovanja,
                Ime=user.Ime,
                Prezime=user.Prezime,
                Username=user.UserName
            };
        }



    
    }
}