package com.gymruben.es.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gymruben.es.domain.PlanNutricionEntrenamiento;
import com.gymruben.es.domain.PlanesEntrenamiento;
import com.gymruben.es.domain.User;
import com.gymruben.es.domain.VideosPlanEntrenamiento;
import com.gymruben.es.repository.PlanNutricionEntrenamientoRepository;
import com.gymruben.es.repository.PlanesEntrenamientoRepository;
import com.gymruben.es.repository.UserRepository;
import com.gymruben.es.repository.VideosPlanEntrenamientoRepository;
import com.gymruben.es.repository.specification.PlanesEntrenamientoSpecification;
import com.gymruben.es.service.helper.FilterHelper;
import com.gymruben.es.service.mapper.PlanesEntrenamientoMapper;

@Service
public class PlanesEntrenamientoService {
     private static final String ENTITY_NAME = "planesEntrenamiento";
    @Autowired
    private PlanesEntrenamientoRepository planesEntrenamientoRepository;

    @Autowired
    private PlanNutricionEntrenamientoRepository planNutricionEntrenamientoRepository;

    @Autowired
    private VideosPlanEntrenamientoRepository videosPlanEntrenamientoRepository;

    @Autowired
    private PlanesEntrenamientoMapper planesEntrenamientoMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public PlanesEntrenamientoService(PlanesEntrenamientoRepository planesEntrenamientoRepository,VideosPlanEntrenamientoRepository videosPlanEntrenamientoRepository,UserRepository userRepository,PlanNutricionEntrenamientoRepository planNutricionEntrenamientoRepository) {
        this.planesEntrenamientoRepository = planesEntrenamientoRepository;
        this.videosPlanEntrenamientoRepository = videosPlanEntrenamientoRepository;
        this.userRepository = userRepository;
        this.planNutricionEntrenamientoRepository = planNutricionEntrenamientoRepository;
    }
    public Page<PlanesEntrenamiento> findAll(Pageable pageable, FilterHelper filterHelper) {
        return planesEntrenamientoRepository.findAll(PlanesEntrenamientoSpecification.busquedaPlanesEntrenamiento(filterHelper), pageable);
    }

     public PlanesEntrenamiento createPlanesEntrenamiento(PlanesEntrenamiento planesEntrenamiento){
        if(planesEntrenamiento.getId()!=null){
         
        }
        String uuid=UUID.randomUUID().toString();
        planesEntrenamiento.setCodigo(uuid);
        String nombreClase= planesEntrenamiento.getNombrePlan();
        Optional<VideosPlanEntrenamiento>videoPlanOptional=videosPlanEntrenamientoRepository.findByTituloVideo(nombreClase);

        if (videoPlanOptional.isPresent()) {
            VideosPlanEntrenamiento videoPlan = videoPlanOptional.get();
            planesEntrenamiento.setVideoId(videoPlan.getUrlVideo());
        }
        String nombrePlan= planesEntrenamiento.getNombrePlan();
        Optional<PlanNutricionEntrenamiento>videoNutricionOptional=planNutricionEntrenamientoRepository.findByNombrePlan(nombrePlan);
        if (videoNutricionOptional.isPresent()) {
            PlanNutricionEntrenamiento videoNutricion = videoNutricionOptional.get();
            planesEntrenamiento.setVideoNutricion(videoNutricion.getVideo());
        }
        String nombrePlanInstruccion= planesEntrenamiento.getNombrePlan();
        Optional<PlanNutricionEntrenamiento>instruccionesOptional=planNutricionEntrenamientoRepository.findByNombrePlan(nombrePlanInstruccion);
        if (instruccionesOptional.isPresent()) {
            PlanNutricionEntrenamiento videoNutricion = instruccionesOptional.get();
            planesEntrenamiento.setInstruccionesNutricion(videoNutricion.getInstrucciones());
        }
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        String username= authentication.getName();
        User user= userRepository.findOneByLogin(username).orElseThrow(()->new UsernameNotFoundException(""));
        planesEntrenamiento.setUser(user);
        return planesEntrenamientoRepository.save(planesEntrenamiento);

            
        }


    }
  
    

