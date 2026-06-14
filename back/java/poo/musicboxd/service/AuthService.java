package poo.musicboxd.service;

import org.springframework.stereotype.Service;

import poo.musicboxd.dto.request.LoginRequestDTO;
import poo.musicboxd.dto.request.UserRegisterRequestDTO;
import poo.musicboxd.dto.response.AuthResponseDTO;

@Service
public class AuthService {

    public void register(UserRegisterRequestDTO request) {

    }

    public AuthResponseDTO login(LoginRequestDTO request) {

        return new AuthResponseDTO("token-de-exemplo");
    }

    public void sendRecoveryEmail(String email) {
   
    }

    public void validateEmail(String email) {
        
    }
}