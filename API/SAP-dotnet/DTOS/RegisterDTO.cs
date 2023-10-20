using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAP_dotnet.DTOS
{
    public class RegisterDTO
    {
        public required string Username { get; set; }
        public required string Email {get;set;}
        public required string Password {get;set;}
        public string AdresaStanovanja { get; set; }
        public string Ime { get; set; }
        public string Prezime {get;set;}
    }
}