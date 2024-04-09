package com.gymruben.es.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gymruben.es.domain.PlanesNutricion;
import com.gymruben.es.repository.PlanesNutricionRepository;
import com.gymruben.es.repository.specification.PlanesNutricionSpecification;
import com.gymruben.es.service.helper.FilterHelper;
import com.gymruben.es.service.mapper.PlanesNutricionMapper;
@Service
public class PlanesNutricionService {
    
    private final PlanesNutricionRepository planesNutricionRepository;
    private final PlanesNutricionMapper planesNutricionMapper;
    public PlanesNutricionService(PlanesNutricionRepository planesNutricionRepository,PlanesNutricionMapper  planesNutricionMapper ) {
        this.planesNutricionRepository = planesNutricionRepository;
        this.planesNutricionMapper = planesNutricionMapper;
    }
    public Page<PlanesNutricion> findAll(Pageable pageable, FilterHelper filterHelper) {
        return planesNutricionRepository.findAll(PlanesNutricionSpecification.busquedaPlanesNutricion(filterHelper), pageable);
    }
}
