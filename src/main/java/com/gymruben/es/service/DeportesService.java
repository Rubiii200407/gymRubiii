package com.gymruben.es.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gymruben.es.domain.Deportes;
import com.gymruben.es.repository.DeportesRepository;
import com.gymruben.es.repository.UserRepository;
import com.gymruben.es.repository.specification.DeportesSpecification;
import com.gymruben.es.service.helper.FilterHelper;
import com.gymruben.es.service.mapper.DeportesMapper;

@Service
public class DeportesService {
    private static final String ENTITY_NAME = "deportes";
    private final DeportesRepository deportesRepository;
    private final UserRepository userRepository;
    private final DeportesMapper deportesMapper;

    public DeportesService(DeportesRepository deportesRepository, UserRepository userRepository,DeportesMapper deportesMapper) {
        this.deportesRepository = deportesRepository;
        this.userRepository = userRepository;
        this.deportesMapper = deportesMapper;
    }
    public Page<Deportes> findAll(Pageable pageable, FilterHelper filterHelper) {
        return deportesRepository.findAll(DeportesSpecification.busquedaDeportes(filterHelper), pageable);
    }

}


