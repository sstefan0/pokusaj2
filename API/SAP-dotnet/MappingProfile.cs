using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SAP_dotnet.DTOS;
using SAP_dotnet.Models;

namespace SAP_dotnet
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<ProductDTO,Product>();
        }
    }
}