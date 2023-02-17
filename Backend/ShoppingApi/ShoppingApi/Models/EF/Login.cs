using System;
using System.Collections.Generic;

namespace ShoppingApi.Models.EF
{
    public partial class Login
    {
        public string Username { get; set; } = null!;
        public string? Password { get; set; }
    }
}
