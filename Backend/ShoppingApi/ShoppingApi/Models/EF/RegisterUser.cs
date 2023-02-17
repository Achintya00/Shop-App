using System;
using System.Collections.Generic;

namespace ShoppingApi.Models.EF
{
    public partial class RegisterUser
    {
        public int Rid { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? City { get; set; }
        public int? Age { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}
