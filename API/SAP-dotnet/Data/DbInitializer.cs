using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SAP_dotnet.Models;

namespace SAP_dotnet.Data
{
    public static class DbInitializer
    {
        public static void Initialize (StoreContext context){
            if (context.Products.Any()) return;
            var products=new List<Product>{
                new Product{
                    Name="Vladimir",
                    ImageData="download.jpeg",
                    Description="student 4. godine etfa"      
                },
                new Product{
                    Name="Vladimir",
                    ImageData="download.jpeg",
                    Description="student 4. godine etfa"      
                },
                new Product{
                    Name="Vladimir",
                    ImageData="download.jpeg",
                    Description="student 4. godine etfa"      
                },

            };
            foreach (var product in products)
            {
                context.Add(product);
            }
            context.SaveChanges();
        }
    }
}