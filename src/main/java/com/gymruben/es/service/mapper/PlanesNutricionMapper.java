package com.gymruben.es.service.mapper;

import org.hashids.Hashids;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.gymruben.es.config.Constants;
import com.gymruben.es.domain.PlanesNutricion;
import com.gymruben.es.service.dto.PlanesNutricionDTO;

@Mapper(componentModel = "spring")
public interface PlanesNutricionMapper extends EntityMapper<PlanesNutricionDTO, PlanesNutricion>{
    
    final Hashids hashids = Constants.HASHIDS;

    @Mapping(target = "id", expression = "java(decodeId(dto.getId()))")
    PlanesNutricion toEntity(PlanesNutricionDTO dto);

    @Named("toDtoCodigo")
    @Mapping(target = "id", expression = "java(encodeId(entity.getId()))")
    @Mapping(target = "codigo", source = "codigo", qualifiedByName = "ultimosDigitos")
    PlanesNutricionDTO toDtoCodigo(PlanesNutricion entity);

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

    

