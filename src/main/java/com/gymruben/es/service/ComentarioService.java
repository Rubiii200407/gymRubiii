package com.gymruben.es.service;

import java.net.URISyntaxException;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gymruben.es.domain.Comentario;
import com.gymruben.es.repository.ClasesOnlineRepository;
import com.gymruben.es.repository.ComentarioRepository;
import com.gymruben.es.repository.DeportesRepository;
import com.gymruben.es.repository.PlanesEntrenamientoRepository;
import com.gymruben.es.repository.PlanesNutricionRepository;
import com.gymruben.es.service.dto.ComentarioDTO;
import com.gymruben.es.service.mapper.ComentarioMapper;
import com.gymruben.es.web.rest.errors.BadRequestAlertException;
@Service
public class ComentarioService {

    private final ComentarioRepository comentarioRepository;
    private static final String ENTITY_NAME = "comentario";


    @Autowired
    private ComentarioMapper comentarioMapper;

    @Autowired
    private DeportesRepository deportesRepository;

    @Autowired
    private ClasesOnlineRepository clasesOnlineRepository;
    @Autowired
    private PlanesEntrenamientoRepository planesEntrenamientoRepository;
    @Autowired
    private PlanesNutricionRepository planesNutricionRepository;
    

    @Autowired
    private MailService mailService;



    public ComentarioService(ComentarioRepository comentarioRepository,ComentarioMapper comentarioMapper,DeportesRepository deportesRepository,MailService mailService) {
        this.comentarioRepository = comentarioRepository;
        this.comentarioMapper = comentarioMapper;
        this.deportesRepository = deportesRepository;
        this.mailService= mailService;
        
    }
  
    public ComentarioDTO createComentario(Comentario comentario) throws URISyntaxException {
        if (comentario.getId() != null) {
            throw new BadRequestAlertException("A new comentario cannot already have an ID", ENTITY_NAME, "idexists");
        }
      
        Instant fechaCreacion = Instant.now();
        comentario.setFechaCreacion(fechaCreacion);

       
        if (!"admin".equals(comentario.getCreador())) {
            String contenidoEmail ="Se ha hecho un comentario en " + (comentario.getDeportes() !=null?comentario.getDeportes():"")+
            (comentario.getClasesOnline() !=null?comentario.getClasesOnline():"")+
            (comentario.getPlanesEntrenamiento() !=null?comentario.getPlanesEntrenamiento():"")+
            (comentario.getPlanesNutricion() !=null?comentario.getPlanesNutricion():"");
            this.mailService.sendEmail("ruben.barba@melit.es", "Nuevo Comentario", contenidoEmail, false, false);
        }

        Comentario comentarioGuardado = comentarioRepository.save(comentario);

        return comentarioMapper.toDto(comentarioGuardado);
    }
}
