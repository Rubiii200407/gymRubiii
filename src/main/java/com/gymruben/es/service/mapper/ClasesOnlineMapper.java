package com.gymruben.es.service.mapper;

import org.hashids.Hashids;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.gymruben.es.config.Constants;
import com.gymruben.es.domain.ClasesOnline;
import com.gymruben.es.service.dto.ClasesOnlineDTO;

@Mapper(componentModel = "spring")
public interface ClasesOnlineMapper extends EntityMapper<ClasesOnlineDTO, ClasesOnline> {
    final Hashids hashids = Constants.HASHIDS;

    @Mapping(target = "id", expression = "java(decodeId(dto.getId()))")
    ClasesOnline toEntity(ClasesOnlineDTO dto);

    @Mapping(target = "id", expression = "java(encodeId(entity.getId()))")
    @Mapping(target = "codigoCompleto", source = "codigo", qualifiedByName = "codigoCompleto")
    @Mapping(target = "codigo", source = "codigo", qualifiedByName = "ultimosDigitos")
    ClasesOnlineDTO toDto(ClasesOnline entity);

    @Named("toDtoCodigo")
    @Mapping(target = "id", expression = "java(encodeId(entity.getId()))")
    @Mapping(target = "codigo", source = "codigo", qualifiedByName = "ultimosDigitos")
    ClasesOnlineDTO toDtoCodigo(ClasesOnline entity);

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

    @Named("codigoCompleto")
    default String codigoCompleto(String codigo) {
        return codigo;
    }
}
