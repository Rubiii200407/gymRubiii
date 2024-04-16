package com.gymruben.es.service;

import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gymruben.es.domain.Fichero;
import com.gymruben.es.repository.FicheroRepository;
import com.gymruben.es.service.dto.FicheroDTO;
import com.gymruben.es.service.mapper.FicheroMapper;

@Service
@Transactional
public class FicheroService {

    private final Logger log = LoggerFactory.getLogger(FicheroService.class);

    private final FicheroRepository ficheroRepository;

    private final FicheroMapper ficheroMapper;

    public FicheroService(FicheroRepository ficheroRepository, FicheroMapper ficheroMapper) {
        this.ficheroRepository = ficheroRepository;
        this.ficheroMapper = ficheroMapper;
    }

    public FicheroDTO createFichero(FicheroDTO ficheroDTO) {
        log.debug("Request to save Fichero : {}", ficheroDTO);
        Fichero fichero = ficheroMapper.toEntity(ficheroDTO);
        fichero = ficheroRepository.save(fichero);
        return ficheroMapper.toDto(fichero);
    }

    public FicheroDTO updateFichero(FicheroDTO ficheroDTO) {
        log.debug("Request to update Fichero : {}", ficheroDTO);
        Fichero fichero = ficheroMapper.toEntity(ficheroDTO);
        fichero = ficheroRepository.save(fichero);
        return ficheroMapper.toDto(fichero);
    }

    @Transactional(readOnly = true)
    public Page<Fichero> findAll(Pageable pageable) {
        log.debug("Request to get all Ficheroes");
        return ficheroRepository.findAll(pageable);
    }

    public Optional<Fichero> getFichero(Long id) {
        log.debug("Request 1 Fichero");
        return ficheroRepository.findById(id);
    }

    public void deleteFichero(Long id) {
        log.debug("Request to delete a Fichero");
        ficheroRepository.deleteById(id);
    }
    @Transactional(readOnly = true)
    public static Long gettamano(String path) throws IOException {
        URL url;
        if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("ftp://")) {
            url = new URL(path);
        } else {
            url = new URL("file", "", path.replace("\\", "/"));
        }
        URLConnection conexion = url.openConnection();
        conexion.connect();
        long size = conexion.getContentLengthLong();
        if (size < 0) {
            throw new IOException("No se pudo obtener el tamano del archivo o el archivo no existe.");
        }
        return size;
    }
}
