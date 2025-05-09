{
  description = "Django-React Project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShell = pkgs.mkShell {
        buildInputs = with pkgs;
          [
            python3
          ]
          ++ (with python3Packages; [
            django
            django-cors-headers
            mysqlclient
            graphene-django
          ]);

        shellHook = ''
          echo "Entering dev shell"
        '';
      };
    });
}
