using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace SAP_dotnet.Models
{
    public class User:IdentityUser
    {
        public string AdresaStanovanja { get; set; }
        public string Ime { get; set; }
        public string Prezime {get;set;}
    }
}