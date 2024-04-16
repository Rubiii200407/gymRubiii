package com.gymruben.es.service.mapper;

import java.io.IOException;

import org.hashids.Hashids;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.gymruben.es.config.Constants;
import com.gymruben.es.domain.Fichero;
import com.gymruben.es.service.FicheroService;
import com.gymruben.es.service.dto.FicheroDTO;

@Mapper(componentModel = "spring")
public interface FicheroMapper extends EntityMapper<FicheroDTO, Fichero> {
    final Hashids hashids = Constants.HASHIDS;

    @Mapping(target = "tamano", source = "path", qualifiedByName = "tamano")
    FicheroDTO toDto(Fichero entidad);

    @Named("tamano")
    default Long tamano(String path) throws IOException {
        return FicheroService.gettamano(path);
    }
}
