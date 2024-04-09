package com.gymruben.es.service.mapper;

import org.hashids.Hashids;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.gymruben.es.config.Constants;
import com.gymruben.es.domain.PlanesEntrenamiento;
import com.gymruben.es.service.dto.PlanesEntrenamientoDTO;

@Mapper(componentModel = "spring")
public interface PlanesEntrenamientoMapper extends EntityMapper<PlanesEntrenamientoDTO, PlanesEntrenamiento>{
    
    final Hashids hashids = Constants.HASHIDS;

    @Mapping(target = "id", expression = "java(decodeId(dto.getId()))")
    PlanesEntrenamiento toEntity(PlanesEntrenamientoDTO dto);

    @Named("toDtoCodigo")
    @Mapping(target = "id", expression = "java(encodeId(entity.getId()))")
    @Mapping(target = "codigo", source = "codigo", qualifiedByName = "ultimosDigitos")
    PlanesEntrenamientoDTO toDtoCodigo(PlanesEntrenamiento entity);

    default String encodeId(Long id) {
        return hashids.encode(id);
    }

    default Long decodeId(String id) {
        return hashids.decode(id)[0];
    }

    @Named("ultimosDigitos")
    default String ultimosDigitos(String codigo) {
        return codigo.substring(Math.max(0, codigo.length() - 6));
    }
}

    
