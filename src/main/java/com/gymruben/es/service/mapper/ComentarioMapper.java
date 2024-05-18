package com.gymruben.es.service.mapper;
import org.hashids.Hashids;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.gymruben.es.config.Constants;
import com.gymruben.es.domain.ClasesOnline;
import com.gymruben.es.domain.Comentario;
import com.gymruben.es.domain.Deportes;
import com.gymruben.es.domain.PlanesEntrenamiento;
import com.gymruben.es.domain.PlanesNutricion;
import com.gymruben.es.service.dto.ClasesOnlineDTO;
import com.gymruben.es.service.dto.ComentarioDTO;
import com.gymruben.es.service.dto.DeportesDTO;
import com.gymruben.es.service.dto.PlanesEntrenamientoDTO;
import com.gymruben.es.service.dto.PlanesNutricionDTO;

@Mapper(componentModel = "spring")
public interface ComentarioMapper extends EntityMapper<ComentarioDTO, Comentario> {
    final Hashids hashids = Constants.HASHIDS;
    @Mapping(target = "deportes", source = "deportes", qualifiedByName = "deportesId")
    @Mapping(target = "planesEntrenamiento", source = "planesEntrenamiento", qualifiedByName = "planesEntrenamientoId")
    @Mapping(target = "clasesOnline", source = "clasesOnline", qualifiedByName = "clasesOnlineId")
    @Mapping(target = "planesNutricion", source = "planesNutricion", qualifiedByName = "planesNutricionId")
    @Mapping(target = "ficheros", source = "fichero")
    ComentarioDTO toDto(Comentario s);
    @Mapping(target = "deportes", source = "deportes", qualifiedByName = "deportesDTOId")
    @Mapping(target = "planesEntrenamiento", source = "planesEntrenamiento", qualifiedByName = "planesEntrenamientoDTOId")
    @Mapping(target = "clasesOnline", source = "clasesOnline", qualifiedByName = "clasesOnlineDTOId")
    @Mapping(target = "planesNutricion", source = "planesNutricion", qualifiedByName = "planesNutricionDTOId")
    @Mapping(target = "fichero", ignore = true)
    Comentario toEntity(ComentarioDTO s);

    @Named("deportesId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", expression = "java(encodeId(deportes.getId()))")
    @Mapping(target = "nombreDeporte", source = "nombreDeporte")
    @Mapping(target = "descripcion", source = "descripcion")
    @Mapping(target = "fechaDeporte", source = "fechaDeporte")
    @Mapping(target = "codigo", source = "codigo")
    @Mapping(target = "horaDeporte", source = "horaDeporte")
    @Mapping(target = "instructor", source = "instructor")
    @Mapping(target = "user", source = "user")
    DeportesDTO toDtoDeportesId(Deportes deportes);

    @Named("deportesDTOId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", expression = "java(decodeId(deportes.getId()))")
    @Mapping(target = "nombreDeporte", source = "nombreDeporte")
    @Mapping(target = "descripcion", source = "descripcion")
    @Mapping(target = "fechaDeporte", source = "fechaDeporte")
    @Mapping(target = "codigo", source = "codigo")
    @Mapping(target = "horaDeporte", source = "horaDeporte")
    @Mapping(target = "instructor", source = "instructor")
    @Mapping(target = "user", source = "user")
    Deportes toEntityDeportesId(DeportesDTO deportes);


    @Named("planesEntrenamientoId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", expression = "java(encodeId(planesEntrenamiento.getId()))")
    @Mapping(target = "nombrePlan", source = "nombrePlan")
    @Mapping(target = "descripcion", source = "descripcion")
    @Mapping(target = "instrucciones", source = "instrucciones")
    @Mapping(target = "codigo", source = "codigo")
    @Mapping(target = "videoId", source = "videoId")
    @Mapping(target = "videoNutricion", source = "videoNutricion")
    @Mapping(target = "instruccionesNutricion", source = "instruccionesNutricion")
    @Mapping(target = "user", source = "user")
    PlanesEntrenamientoDTO toDtoPlanesEntrenamientoId(PlanesEntrenamiento planesEntrenamiento);

    @Named("planesEntrenamientoDTOId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", expression = "java(decodeId(planesEntrenamiento.getId()))")
    @Mapping(target = "nombrePlan", source = "nombrePlan")
    @Mapping(target = "descripcion", source = "descripcion")
    @Mapping(target = "instrucciones", source = "instrucciones")
    @Mapping(target = "codigo", source = "codigo")
    @Mapping(target = "videoId", source = "videoId")
    @Mapping(target = "videoNutricion", source = "videoNutricion")
    @Mapping(target = "instruccionesNutricion", source = "instruccionesNutricion")
    @Mapping(target = "user", source = "user")
    PlanesEntrenamiento toEntityPlanesEntrenamientoId(PlanesEntrenamientoDTO planesEntrenamiento);

    @Named("clasesOnlineId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", expression = "java(encodeId(clasesOnline.getId()))")
    @Mapping(target = "nombreClase", source = "nombreClase")
    @Mapping(target = "descripcion", source = "descripcion")
    @Mapping(target = "fechaClase", source = "fechaClase")
    @Mapping(target = "codigo", source = "codigo")
    @Mapping(target = "horaClase", source = "horaClase")
    @Mapping(target = "instructor", source = "instructor")
    @Mapping(target = "videoId", source = "videoId")
    @Mapping(target = "user", source = "user")
    ClasesOnlineDTO toDtoClasesOnlineId(ClasesOnline clasesOnline);

    @Named("clasesOnlineDTOId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", expression = "java(decodeId(clasesOnline.getId()))")
    @Mapping(target = "nombreClase", source = "nombreClase")
    @Mapping(target = "descripcion", source = "descripcion")
    @Mapping(target = "fechaClase", source = "fechaClase")
    @Mapping(target = "codigo", source = "codigo")
    @Mapping(target = "horaClase", source = "horaClase")
    @Mapping(target = "instructor", source = "instructor")
    @Mapping(target = "videoId", source = "videoId")
    @Mapping(target = "user", source = "user")
    ClasesOnline toEntityClasesOnlineId(ClasesOnlineDTO clasesOnline);


    @Named("planesNutricionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", expression = "java(encodeId(planesNutricion.getId()))")
    @Mapping(target = "nombrePlan", source = "nombrePlan")
    @Mapping(target = "descripcion", source = "descripcion")
    @Mapping(target = "instrucciones", source = "instrucciones")
    @Mapping(target = "codigo", source = "codigo")
    @Mapping(target = "alimentosRecomendados", source = "alimentosRecomendados")
    @Mapping(target = "user", source = "user")
    PlanesNutricionDTO toDtoPlanesNutricionId(PlanesNutricion planesNutricion);

    @Named("planesNutricionDTOId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", expression = "java(decodeId(planesNutricion.getId()))")
    @Mapping(target = "nombrePlan", source = "nombrePlan")
    @Mapping(target = "descripcion", source = "descripcion")
    @Mapping(target = "instrucciones", source = "instrucciones")
    @Mapping(target = "codigo", source = "codigo")
    @Mapping(target = "alimentosRecomendados", source = "alimentosRecomendados")
    @Mapping(target = "user", source = "user")
    PlanesNutricion toEntityPlanesNutricionId(PlanesNutricionDTO planesNutricion);
    default Long decodeId(String id) {
        return hashids.decode(id)[0];
    }

    default String encodeId(Long id) {
        return hashids.encode(id);
    }
  
    

}
